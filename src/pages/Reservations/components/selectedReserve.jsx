import { Content, List } from "../style"
import FirstColumn from "./firstColumnSelectedReserve"
import SecondColumn from "./secondColumnSelectedReserve"

const SelectedReserve = (props) => {

    const { 
        valuesDebt, hasDebt,
        error, messageError,
        dateTime, setDateTime,
        setTrocoCliente, trocoCliente
    } = props.reservationData
    const { paymentLines, setPaymentLines } = props.paymentData

    return (
        <Content>
            <List padding={"2.4rem 4rem"}>
                {/* Primeira coluna (informações da reserva) */}
                <FirstColumn 
                    states={{
                        dateTime,
                        setDateTime
                    }}
                />

                {/* Segunda coluna (informações de pagamento) */}
                <SecondColumn 
                    states={{
                        hasDebt,
                        error,
                        messageError,
                        valuesDebt,
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