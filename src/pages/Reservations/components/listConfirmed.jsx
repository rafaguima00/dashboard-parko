import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import { List, ListHeader, Text, ListBody, ElementList, ItemList } from "../style"
import EmptyMessage from "../../../components/EmptyMessage"
import { theme } from "../../../theme/theme"
import { mapDateTime } from "../utils/mapDateTime"
import { mapValue } from "../utils/mapValue"

const ListConfirmedReserve = (props) => {

    const { primaryColor } = theme
    const { filterReserv, priceTable, listReservations } = props
    const { setSelectedClient, dataClient } = useUser()

    const [clicked, setClicked] = useState(0)

    const handleOnClick = ({ index, item }) => {
        setClicked(index)
        setSelectedClient(item)
    }

    useEffect(() => {
        if(dataClient.id_establishment) {
            listReservations()

            const intervalo = setInterval(listReservations, 3000)
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
                            backgroundcolor={clicked === index ? primaryColor : "#f4f4f4"}
                            textcolor={clicked === index ? "#fff" : "#7c7c7c"}
                            onClick={() => handleOnClick({ index, item })}
                        >
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.name_vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{mapDateTime(item)}</ItemList>
                            <ItemList>{mapValue(item, priceTable)}</ItemList>
                        </ElementList>
                    </ListBody>
                )) :
                <EmptyMessage>Nenhuma reserva encontrada</EmptyMessage> 
            }
        </List>
    )
}

export default ListConfirmedReserve