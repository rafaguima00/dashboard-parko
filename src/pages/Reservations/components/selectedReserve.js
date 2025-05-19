import { useEffect } from "react"
import { useUser } from "../../../context/globalContext"
import { Content, List } from "../style"
import FirstColumn from "./firstColumnSelectedReserve"
import SecondColumn from "./secondColumnSelectedReserve"

const SelectedReserve = (props) => {

    const { 
        valuesDebt, 
        reservaAberta, 
        hasDebt,
        error,
        messageError,
        total,
        valorDaReservaAtual,
        diferenca,
        linhas, 
        setLinhas,
        dateTime,
        setDateTime,
        setTrocoCliente,
        trocoCliente,
        listReservations
    } = props.state
    
    const { setSelectedClient } = useUser()

    useEffect(() => {
        if(reservaAberta) {
            const indexOf = reservaAberta.values().next().value
            setSelectedClient(indexOf)
        }
    }, [])

    return (
        <Content>
            <List padding={"2.4rem 4rem"}>
                {/* Primeira coluna (informações da reserva) */}
                <FirstColumn 
                    states={{
                        dateTime,
                        setDateTime,
                        valorDaReservaAtual,
                        listReservations
                    }}
                />

                {/* Segunda coluna (informações de pagamento) */}
                <SecondColumn 
                    states={{
                        hasDebt,
                        error,
                        messageError,
                        valuesDebt,
                        total,
                        valorDaReservaAtual,
                        diferenca,
                        setLinhas,
                        linhas,
                        setTrocoCliente,
                        trocoCliente
                    }}
                />
            </List>
        </Content>
    )
}

export default SelectedReserve