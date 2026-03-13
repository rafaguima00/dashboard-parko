import api from "../api/server"

export const ReadPriceTable = async (id) => {
    try {
        const res = await api.get(`/tabela_preco/${id}`)

        return res.data
    } catch (error) {
        return error
    }
}