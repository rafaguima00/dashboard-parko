import api from "../api/server"

export const readAportes = async () => {
    const res = await api.get("/aportes")
    return res.data
}

export const createAportes = async (aporte) => {
    const res = await api.post("/aportes", aporte)
    return res.data
}