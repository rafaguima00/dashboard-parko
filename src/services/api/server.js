import axios from "axios"

let api

if (process.env.REACT_APP_URL_API) {
    api = axios.create({
        baseURL: process.env.REACT_APP_URL_API,
    })
} else {
    console.error("⚠️ Variável REACT_APP_URL_API não definida!")
}

export default api