import { useUser } from "../../../context/globalContext"

const ArrayInfo = () => {
    const { selectedClient } = useUser()
    const { hora_entrada, hora_saida, id, license_plate, name, name_vehicle } = selectedClient || {}

    const gridItems = [
        {
            id: 1,
            title: "Número reserva",
            info: id
        },
        {
            id: 2,
            title: "Placa",
            info: license_plate
        },
        {
            id: 3,
            title: "Cliente",
            info: name
        },
        {
            id: 4,
            title: "Entrada",
            info: hora_entrada
        },
        {
            id: 5,
            title: "Veículo",
            info: name_vehicle
        },
        {
            id: 6,
            title: "Saída",
            info: hora_saida
        }
    ]

    return { gridItems }
}

export default ArrayInfo