import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import { List, ListHeader, Text, ListBody, ElementList, ItemList } from "../style"
import EmptyMessage from "../../../components/EmptyMessage"
import { theme } from "../../../theme/theme"
import { mapDateTime } from "../../../utils/MapDateTime"
import { calculateReservationValue } from "../../../utils/CalculateReservationValue"
import useReservation from "../../../hooks/useReservation"
import { formatCurrency } from "../../../utils/FormatCurrency"

const ListConfirmedReserve = (props) => {

    const { primaryColor } = theme
    const { filterReserv, reservationComplete } = props
    const { setSelectedClient, dataClient, priceTable, tabelaFixa } = useUser()
    const { fetchReservations } = useReservation()

    const [clicked, setClicked] = useState(0)

    const handleOnClick = ({ item }) => {
        setClicked(item.id)
        setSelectedClient(item)
    }

    const mapValue = (item) => {
        const { valorDaReservaAtual } = calculateReservationValue(item, priceTable, tabelaFixa, item.type_of_charge)

        return formatCurrency(valorDaReservaAtual, 'BRL')
    }

    useEffect(() => {
        if (reservationComplete) {
            setClicked(reservationComplete.id)
            setSelectedClient(reservationComplete)
        }
    }, [])

    useEffect(() => {
        if (dataClient.id_establishment) {
            fetchReservations()

            const intervalo = setInterval(fetchReservations, 3000)
            return () => clearInterval(intervalo)
        }
    }, [dataClient])

    return (
        <List>
            <ListHeader>
                <Text>Reserva</Text>
                <Text>Cliente</Text>
                <Text>Veículo</Text>
                <Text>Placa</Text>
                <Text>Entrada</Text>
                <Text>Valor</Text>
            </ListHeader>
            {
                filterReserv.length !== 0 ?
                filterReserv.map((item, index) => (
                    <ListBody key={item.id}>
                        <ElementList
                            backgroundcolor={clicked === item.id ? primaryColor : "#f4f4f4"}
                            textcolor={clicked === item.id ? "#fff" : "#7c7c7c"}
                            onClick={() => handleOnClick({ index, item })}
                        >
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.name_vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{mapDateTime(item)}</ItemList>
                            <ItemList>{mapValue(item)}</ItemList>
                        </ElementList>
                    </ListBody>
                )) :
                <EmptyMessage>Nenhuma reserva encontrada</EmptyMessage> 
            }
        </List>
    )
}

export default ListConfirmedReserve