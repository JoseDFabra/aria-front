import { useEffect } from "react";
import {getAllPoints} from '../api/aria.api'

export function PointList(){

  useEffect(()=>{


    async function loadPoints(){
      const res =await getAllPoints();
      console.log(res.data);
    }
    loadPoints();
  },[])
  
  return(
    <>
      <h2>HOLA DESDE PointList</h2>
    </>
  );
}