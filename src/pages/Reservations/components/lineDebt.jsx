import { formatCurrency } from "../../../utils/FormatCurrency"
import { Add, Price, Select } from "../style"

const LineDebt = (props) => {

    const { valueSelectDebt, valorAPagar, setOpenDebt } = props.states

    return <>
        <Select value={valueSelectDebt} disabled>
            <option value="credit_card">Maquineta (Crédito)</option>
            <option value="debit_card">Maquineta (Débito)</option>
            <option value="money">Dinheiro</option>
            <option value="pix">Pix</option>
        </Select>
        <Price
            type="text" 
            placeholder="Valor (R$)" 
            value={formatCurrency(valorAPagar ? valorAPagar : 0, 'BRL')}
            disabled
        />
        <Add onClick={() => setOpenDebt(true)}>+</Add>
    </>
}

export default LineDebt