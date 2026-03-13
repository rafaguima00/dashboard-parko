import api from "../api/server"

export const readPark = async (id) => {
    try {
        const res = await api.get(`/establishments/${id}`)
        return res.data        
    } catch (error) {
        return error
    }
}