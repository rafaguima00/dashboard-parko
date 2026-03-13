import api from "../api/server"

export const readDividas = async (id) => {
    try {
        const res = await api.get(`/debts/${id}`)

        return res.data
    } catch (error) {
        return error
    }
}