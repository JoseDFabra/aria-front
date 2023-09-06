import { useEffect, useState } from "react";
import {
  getAllPoints,
  deletePoint,
  updatePoint,
  getpoint,
} from "../api/aria.api";
import { useForm } from "react-hook-form";
import { createPoint } from "../api/aria.api";

export function PointList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try{
      console.log(data);
      await createPoint(data);
      reset();
    }
    catch(error){
      console.error('onsubmit error: ' + error);
    }
  });
  const [currentPunto, setCurrentPunto] = useState(undefined);
  const [puntos, setPuntos] = useState([]);

  useEffect(() => {
    async function loadPoints() {
      const res = await getAllPoints();
      setPuntos(res.data);
      //console.log(res);
    }
    loadPoints();
  }, []);

  useEffect(() => {
    const llamada = async () => {
      console.log(currentPunto);
      const res = await getpoint(currentPunto.name);
      console.log(res.data);
      setValue("name", res.data.name);
      setValue("motor1_angle", res.data.motor1_angle);
      setValue("motor2_angle", res.data.motor2_angle);
      setValue("motor3_angle", res.data.motor3_angle);
      setValue("motor4_angle", res.data.motor4_angle);
      setValue("motor5_angle", res.data.motor5_angle);
    };
    if (currentPunto) {
      llamada();
    }
  }, [currentPunto, setValue,]);

  const handleChangeOptionPoints = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCurrentPunto(null);
    } else {
      const p = JSON.parse(value);
      setCurrentPunto(p);
    }
  };
  const borrandoPunto = async () => {
    console.log("currentPunto", currentPunto.name);
    await deletePoint(currentPunto.name);
    const nuevoPointOptions = puntos.filter(
      (p) => p.name !== currentPunto.name
    );
    setPuntos(nuevoPointOptions);
    setCurrentPunto(null);
  };
  console.log('nombre nuevo:', watch());

  const actualizandoPunto = async () => {
    try{
      console.log('nombre anterior que quiero actualizar', currentPunto.name);
      const res = await updatePoint(currentPunto.name, watch());
      console.log(res);
      console.log(currentPunto.name);
      console.log(currentPunto);

    }
    catch(error){
      console.error('Actualizacion fallida', error);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span> Este campo es requerido</span>}
          <input
            type="number"
            placeholder="motor 1"
            {...register("motor1_angle", { required: true })}
          />
          {errors.motor1_angle && <span> Este campo es requerido</span>}

          <input
            type="number"
            placeholder="motor 2"
            {...register("motor2_angle", { required: true })}
          />
          {errors.motor2_angle && <span> Este campo es requerido</span>}

          <input
            type="number"
            placeholder="motor 3"
            {...register("motor3_angle", { required: true })}
          />
          {errors.motor3_angle && <span> Este campo es requerido</span>}

          <input
            type="number"
            placeholder="motor 4"
            {...register("motor4_angle", { required: true })}
          />
          {errors.motor4_angle && <span> Este campo es requerido</span>}

          <input
            type="number"
            placeholder="motor 5"
            {...register("motor5_angle", { required: true })}
          />
          {errors.motor5_angle && <span> Este campo es requerido</span>}

          <button>Save</button>
        </form>
      </div>
      <button
        onClick={async () => {
          if (window.confirm("Are you sure you want to delete this point?")) {
            console.log("punto borrado");
            borrandoPunto();
          } else {
            console.log("no se borro el punto");
          }
        }}
      >
        Delete
      </button>

      <button
        onClick={async() => {
          if (window.confirm("Are you sure you want to update this point?")) {
            const res = await actualizandoPunto();
            console.log(res);
          }
        }}
      >
        Update
      </button>
      <br />
      <select name="puntos" onChange={handleChangeOptionPoints}>
        <option value={""}>Seleccionar punto</option>
        {puntos.map((p, i) => (
          <option className="lista-li" key={i} value={JSON.stringify(p)}>
            {`${p.name}: [${p.motor1_angle}],
                  [${p.motor2_angle}],
                  [${p.motor3_angle}],
                  [${p.motor4_angle}],
                  [${p.motor5_angle}]`}
          </option>
        ))}
      </select>
      <p>{currentPunto ? JSON.stringify(currentPunto) : ""}</p>
    </>
  );
}
