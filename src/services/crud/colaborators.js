import api from "../api/server"

export const readColaborators = async (id) => {
    try {
        const res = await api.get(`/colaborators/${id}`)

        return res.data
    } catch (error) {
        return error        
    }
}

export const createEmailVerification = async (email) => {
    try {
        const res = await api.post("/verify-email", email)

        return res
    } catch (error) {
        return {
            status: error.response.status,
            message: error.response.data.message
        }
    }
} 