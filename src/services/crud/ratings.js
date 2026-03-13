import api from "../api/server"

export const readRatings = async (id) => {
    try {
        const res = await api.get(`/ratings/${id}`) 

        return res.data
    } catch (error) {
        return error
    }
}