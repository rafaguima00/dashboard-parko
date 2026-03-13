import api from "../api/server"

export const readColaborators = async (id) => {
    try {
        const res = await api.get(`/colaborators/${id}`)

        return res.data
    } catch (error) {
        return error        
    }
}