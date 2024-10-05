import axios from "axios"

const cepService = axios.create({
    baseURL: "https://viacep.com.br/ws/"
})

export default cepService