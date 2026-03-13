import api from "../api/server"

export const readAberturaDoCaixa = async (id) => {
    try {
        const res = await api.get(`/abertura_caixa/parking/${id}`)

        if (res.data && res.data.length > 0) {
            return res.data[res.data.length - 1]
        }
    } catch (error) {
        return error
    }
}