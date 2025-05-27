import api from "../api/server"

export const listReservations = async (idEstablishment) => {
    const res = await api.get(`/reservations/parking/${idEstablishment}`)
    return res.data
}

export const createReservation = async (reservation) => {
    const res = await api.post("/reservations", reservation)
    return res.data
}

export const updateReservation = async (id, reservation) => {
    const res = await api.put(`reservations/${id}`, reservation)
    return res.data
}