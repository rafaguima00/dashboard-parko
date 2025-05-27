import { useUser } from "../../../context/globalContext"
import { 
    List,
    ListHeader,
    Text,
    ListBody
} from "../style"
import EmptyMessage from "../../../components/EmptyMessage"
import ReadApi from "../../../services/readData"
import { useEffect, useState } from "react"
import RenderItem from "./renderItem"
import useReservation from "../../../hooks/useReservation"

const ListReserve = (props) => {

    const { reservaFechada } = props
    const { dataClient, reservations, debts } = useUser()
    const { listDividas } = ReadApi()
    const { fetchReservations } = useReservation()

    const firstWord = dataClient?.colaborator ?? ""

    const [clicked, setClicked] = useState(0)
    const [debtClient, setDebtClient] = useState()
    const [valuesDebt, setValuesDebt] = useState(0)

    // Selecionar cada reserva
    const handleOnClick = (item) => {
        const { id } = item
        setClicked(id)
    }

    // Assim que clicar em um item a função vai retornar a reserva selecionada
    const verificarDividas = () => {

        // Verificar se o cliente possui dívidas
        const filterReserve = reservations.find(item => item.id === clicked)
        const filterDebts = debts.filter(
            item => item.id_costumer === filterReserve?.id_costumer && 
            item.status === "Pendente"
        )
        
        // Caso tenha dívida, a função vai retornar o valor da dívida
        if (filterDebts) {
            const encontrarValores = filterDebts.map(item => item.value)

            // Se possuir mais de uma dívida, fazer a soma dos valores e retornar o total
            if(encontrarValores.length >= 1) {
                setDebtClient(true)
                const somarValores = encontrarValores.reduce((acc, current) => {
                    return acc + current
                })
                setValuesDebt(somarValores)
            } else {
                setDebtClient(false)
            }
        }
    }

    useEffect(() => {
        fetchReservations()
    }, [reservaFechada, reservations])

    useEffect(() => {
        verificarDividas()
    }, [clicked])

    useEffect(() => {
        listDividas()
    }, [])

    return (
        <List>
            <ListHeader>
                <Text>Reserva</Text>
                <Text>Cliente</Text>
                <Text>Veículo</Text>
                <Text>Placa</Text>
                <Text>Saída</Text>
                <Text>Valor</Text>
                <Text>Caixa</Text>
            </ListHeader>
            {
                reservaFechada.length > 0 ?
                reservaFechada.map((item) => (
                    <ListBody key={item.id}>
                        <RenderItem
                            valuesDebt={valuesDebt}
                            item={item}
                            clicked={clicked}
                            setClicked={setClicked}
                            firstWord={firstWord}
                            debtClient={debtClient}
                            handleOnClick={handleOnClick}
                            verificarDividas={verificarDividas}
                        />
                    </ListBody>
                )) :
                <EmptyMessage>Nenhuma reserva fechada hoje</EmptyMessage>
            }
        </List>
    )
}

export default ListReserve