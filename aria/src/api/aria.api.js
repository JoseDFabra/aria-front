import axios from 'axios'


export const getAllPoints=()=>{
  return axios.get('http://015b-186-169-139-101.ngrok-free.app/api/v1/edit/point/')
 
}
