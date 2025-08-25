import axios from "axios"

let api

if (process.env.REACT_APP_URL_API) {
    api = axios.create({
        baseURL: process.env.REACT_APP_STATUS_APP === "test" ? 
        "http://192.168.15.7:3300/api" : 
        process.env.REACT_APP_URL_API
    })

} else {
    console.log("⚠️ Variável REACT_APP_URL_API não definida!")
}

export default api