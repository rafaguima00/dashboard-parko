import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import {
    List,
    ListHeader,
    Text,
    ListBody,
    ElementList,
    ItemList
} from "../style"
import { formatCurrency } from "../../../services/formatCurrency"
import ReadApi from "../../../services/readData"
import EmptyMessage from "../../../components/EmptyMessage"

const ListConfirmedReserve = (props) => {

    const { reservaPendente } = props

    const [clicked, setClicked] = useState(0)

    const { setSelectedClient, dataClient, reservations } = useUser()
    const { listReservations } = ReadApi()

    const handleOnClick = ({ index, item }) => {
        setClicked(index)
        setSelectedClient(item)
    }

    useEffect(() => {
        listReservations(dataClient.id_establishment)
    }, [reservaPendente, reservations])

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
                reservaPendente.length !== 0 ?
                reservaPendente.map((item, index) => (
                    <ListBody key={item.id}>
                        <ElementList
                            backgroundcolor={clicked === index ? "#523499" : "#f4f4f4"}
                            textcolor={clicked === index ? "#fff" : "#7c7c7c"}
                            onClick={() => handleOnClick({ index, item })}
                        >
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.name_vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{item.data_entrada}, {item.hora_entrada}</ItemList>
                            <ItemList>{formatCurrency(item.value, 'BRL')}</ItemList>
                        </ElementList>
                    </ListBody>
                )) :
                <EmptyMessage>Nenhuma reserva aberta no momento</EmptyMessage> 
            }
        </List>
    )
}

export default ListConfirmedReserve;