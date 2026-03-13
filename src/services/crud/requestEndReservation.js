import api from "../api/server"

export const readRequestEndReservation = async (id) => {
    try {
        const res = await api.get(`/request_end/${id}`)

        return res.data
    } catch (error) {
        return error
    }
}

export const updateRequestEndReservation = async (item) => {
    try {
        await api.put("/request_end", [
            {
                id: item.id
            }
        ])

        console.log("atualizado com sucesso")
        return "Update request atualizado com sucesso"
    } catch (error) {
        return error
    }
}