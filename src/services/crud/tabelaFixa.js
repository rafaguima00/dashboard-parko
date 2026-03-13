import api from "../api/server"

export const readTabelaFixa = async (id) => {
    const res = await api.get(`/tabela_fixa/${id}`)

    return res.data
}