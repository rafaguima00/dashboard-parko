export const horarioDeSaida = (createdAt) => {
    const date = new Date(createdAt)
    const time = date.toTimeString().split(" ")[0]
    return time
}