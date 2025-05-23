import { formatCurrency } from "../../../utils/FormatCurrency"
import { TextOption } from "../style"

const ValueReservation = ({ titulo, variavel, corDoTexto = "" }) => {
    return <>
        <TextOption>
            {titulo} {"\n"}
            <strong style={{ color: corDoTexto }}>
                {formatCurrency(variavel ? variavel : 0, 'BRL')}
            </strong>
        </TextOption>
    </>
}

export default ValueReservation