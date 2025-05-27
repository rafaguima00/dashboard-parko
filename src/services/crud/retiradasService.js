import api from "../api/server"

export const readRetiradas = async () => {
    const res = await api.get("retiradas")
    return res.data
}

export const createRetiradas = async (retirada) => {
    const res = await api.post("/retiradas", retirada)
    return res.data
}