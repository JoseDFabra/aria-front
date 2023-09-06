import axios from "axios";

const robotApi = axios.create({
  baseURL: "http://localhost:8000/api/v1/edit/",
});

export const getAllPoints = () => robotApi.get("point/");

export const getpoint =(id)=> robotApi.get(`point/${id}/`)

export const createPoint = (point) => robotApi.post("point/", point);

export const deletePoint = (id) => robotApi.delete(`point/${id}/`);

export const updatePoint = (id, point) => robotApi.put(`point/${id}/`, point);