import api from "../api/server"

export const readPayments = async (idEstablishment) => {
    try {
        const res = await api.get(`/payment/${idEstablishment}`)

        return res.data
    } catch (error) {
        return error
    }
}