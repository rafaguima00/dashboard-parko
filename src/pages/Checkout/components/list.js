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
import EmptyMessage from "../../../components/EmptyMessage"
import ReadApi from "../../../services/readData"
import { useEffect, useState } from "react"
import { theme } from "../../../theme/theme"

const ListReserve = (props) => {

    const { reservaFechada } = props
    const { primaryColor, blueColor } = theme
    const { dataClient, reservations, setSelectedClient, selectedClient } = useUser()
    const { listReservations } = ReadApi()

    const firstWord = dataClient?.colaborator ?? ""

    const [clicked, setClicked] = useState(0)

    const handleOnClick = (item) => {
        const { id } = item
        setClicked(id)
    }

    useEffect(() => {
        listReservations(dataClient.id_establishment)
    }, [reservaFechada, reservations])

    return (
        <List>
            <ListHeader>
                <Text>Reserva</Text>
                <Text>Cliente</Text>
                <Text>Veículo</Text>
                <Text>Placa</Text>
                <Text>Entrada</Text>
                <Text>Valor</Text>
                <Text>Caixa</Text>
            </ListHeader>
            {
                reservaFechada.length !== 0 ? 
                reservaFechada.map((item) => (
                    <ListBody key={item.id}>
                        <ElementList 
                            backgroundcolor={clicked === item.id ? blueColor : "#f4f4f4"}
                            textcolor={clicked === item.id ? "#fff" : "#7c7c7c"}
                            onClick={() => handleOnClick(item)}
                        >
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.name_vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{item.data_entrada}, {item.hora_entrada}</ItemList>
                            <ItemList>{formatCurrency(item.value, 'BRL')}</ItemList>
                            <ItemList>{firstWord.split(" ")[0]}</ItemList>
                        </ElementList>
                    </ListBody>
                )) :
                <EmptyMessage>Nenhuma reserva fechada no momento</EmptyMessage> 
                
            }
        </List>
    )
}

export default ListReserve