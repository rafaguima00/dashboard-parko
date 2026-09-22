import { Content, List } from "../style"
import FirstColumn from "./firstColumnSelectedReserve"
import SecondColumn from "./secondColumnSelectedReserve"

const SelectedReserve = (props) => {

    return (
        <Content>
            <List padding={"2.4rem 4rem"}>
                {/* Primeira coluna (informações da reserva) */}
                <FirstColumn />

                {/* Segunda coluna (informações de pagamento) */}
                <SecondColumn {...props} />
            </List>
        </Content>
    )
}

export default SelectedReserve