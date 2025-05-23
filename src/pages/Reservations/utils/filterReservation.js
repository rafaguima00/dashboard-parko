export const filterOpenReservations = (reservations) => {
    return reservations.filter(
        item => ["Pendente", "Confirmado", "Recusado"].includes(item.status)
    )
}

export const filterByText = (reservations, text) => {
    return reservations.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()) ||
                item.license_plate.toLowerCase().includes(text.toLowerCase()) ||
                item.id == text
    )
}
