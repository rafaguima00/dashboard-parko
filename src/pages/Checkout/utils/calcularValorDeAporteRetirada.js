export const calcularValorDosAportesERetiradas = (data, filtrarPorData) => {
    if (!data) return

    const filtrarItem = (array) => array.filter(
        item => item.created_at.slice(0, 10) === filtrarPorData
    )

    const calcularSoma = (array) => array.map(item => item.value)
        .reduce((prev, current) => {
            return prev + current
        }, 0) 

    const findByDate = filtrarItem(data)
    const valuesTotal = calcularSoma(findByDate)

    return valuesTotal
}