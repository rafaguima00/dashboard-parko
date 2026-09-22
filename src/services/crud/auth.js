import api from "../api/server"

export const userAuthentication = async (data) => {
    try {
        const res = await api.post("/login", data)

        return res.data
    } catch (error) {
        return error.response.data.message
    }
}