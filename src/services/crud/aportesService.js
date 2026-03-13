import api from "../api/server"

export const readAportes = async (id) => {
    const res = await api.get(`/aportes/${id}`)
    return res.data
}

export const createAportes = async (aporte) => {
    const res = await api.post("/aportes", aporte)
    return res.data
}