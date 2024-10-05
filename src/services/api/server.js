import axios from "axios"

const api = axios.create({
    baseURL: "http://192.168.0.122:3300/api"
})
//https://parko-server.vercel.app/api/
export default api
