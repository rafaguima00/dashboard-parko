import api from "../api/server"

export const readPayments = async (idEstablishment) => {
    const res = await api.get(`/payment/${idEstablishment}`)
    return res.data
}