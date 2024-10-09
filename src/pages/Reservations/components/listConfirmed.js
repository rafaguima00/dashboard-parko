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
import { theme } from "../../../theme/theme"

const ListConfirmedReserve = (props) => {

    const { primaryColor } = theme
    const { filterReserv, priceTable } = props

    const { setSelectedClient, dataClient, reservations } = useUser()
    const { listReservations } = ReadApi()

    const [clicked, setClicked] = useState(0)

    const handleOnClick = ({ index, item }) => {
        setClicked(index)
        setSelectedClient(item)
    }

    const mapValue = (item) => {
        let converterDataCliente = new Date(item.data_entrada+" "+item.hora_entrada).getTime()

        const tempoAtual = new Date().getTime()
        const diferenca = tempoAtual - converterDataCliente
        const totalHoras = ((new Date(diferenca).getUTCDate() - 1) * 24) + (new Date(diferenca).getUTCHours())

        if(diferenca <= 0) {
            return formatCurrency(0, 'BRL')
        }
        
        if(totalHoras >= 1) {
            return formatCurrency(((priceTable?.valor_fracao_hora ?? "") * totalHoras) + (item.value), 'BRL')
        }
        
        return formatCurrency(item.value, 'BRL')
    }

    const mapDateTime = (item) => {
        const dataDaReserva = new Date(`${item.data_entrada}, ${item.hora_entrada}`)
        return `${dataDaReserva.toLocaleDateString()}, ${dataDaReserva.toLocaleTimeString()}`
    }

    useEffect(() => {
        listReservations(dataClient.id_establishment)
    }, [filterReserv, reservations])

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