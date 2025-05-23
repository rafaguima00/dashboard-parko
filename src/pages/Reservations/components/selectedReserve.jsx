import { Content, List } from "../style"
import FirstColumn from "./firstColumnSelectedReserve"
import SecondColumn from "./secondColumnSelectedReserve"

const SelectedReserve = (props) => {

    const { 
        valuesDebt, hasDebt,
        error, messageError,
        total, valorDaReservaAtual,
        dateTime, setDateTime,
        setTrocoCliente, trocoCliente,
        listReservations, diferenca
    } = props.reservationData
    const { paymentLines, setPaymentLines } = props.paymentData

    return (
        <Content>
            <List padding={"2.4rem 4rem"}>
                {/* Primeira coluna (informações da reserva) */}
                <FirstColumn 
                    states={{
                        dateTime,
                        setDateTime,
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
                        setPaymentLines,
                        paymentLines,
                        setTrocoCliente,
                        trocoCliente
                    }}
                />
            </List>
        </Content>
    )
}

export default SelectedReserve