import { useUser } from "../../../context/globalContext"
import { ArrayElement, Price, Select } from "../style"
import { formatCurrency } from "../../../utils/FormatCurrency"
import { unformatCurrency } from "../../../utils/UnformatCurrency"
import useReservation from "../../../hooks/useReservation"
import { useEffect } from "react"
import usePayment from "../../../hooks/usePayment"

const RenderItem = (props) => {

    const { paymentLines, setPaymentLines, somarValores, setTrocoCliente, optionMoney } = props.states

    const { selectedClient, valueSelectDebt, resumoVendas } = useUser()
    const { valorTotal } = useReservation()
    const { fetchPayments } = usePayment()
    const total = valorTotal()

    const handleSelectChange = (e, index) => {
        const value = e.target.value

        setPaymentLines(paymentLines.map((linha, i) =>
            i === index ? { ...linha, valueSelect: value } : linha
        ))
    }
      
    const handleChange = (e, index) => {
        const rawValue = e.target.value

        if(rawValue === "") return  

        const formatValue = rawValue?.replace(/\D/g, '').slice(0, 6)
        const numericValue = unformatCurrency(formatValue) / 100
        
        setPaymentLines(paymentLines.map((linha, i) =>
            i === index ? { ...linha, valorPgto: formatCurrency(numericValue, 'BRL') } : linha
        ))
    }

    const troco = (index) => {
        const { valorPgto, valueSelect } = paymentLines[index]

        if ((somarValores > unformatCurrency(total)/100) && (optionMoney.length > 0 || valueSelectDebt === "money")) {
            setTrocoCliente(somarValores - (unformatCurrency(total)/100))
        }

        if (valueSelect !== "money" || valorPgto < 0) {
            setPaymentLines(paymentLines.map((linha, i) =>
                i === index ? { ...linha, trocoCliente: 0 } : linha
            ))
        }
    }

    const pesquisarPagamento = () => {
        const findPgto = resumoVendas.find(item => item.id_reservation === selectedClient?.id)

        return findPgto
    }

    const pagamento = pesquisarPagamento()

    useEffect(() => {
        fetchPayments()
    }, [])

    useEffect(() => {
        pesquisarPagamento()
    }, [selectedClient])

    return paymentLines.map((linha, index) => (
        <ArrayElement key={index}>
            <Select
                value={selectedClient?.parko_app === 1 && index === 0 ? pagamento.payment_method : linha.valueSelect}
                disabled={selectedClient?.parko_app === 1 && index === 0 ? true : false}
                onChange={e => handleSelectChange(e, index)}
            >
                <option value="credit_card">Maquineta (Crédito)</option>
                <option value="debit_card">Maquineta (Débito)</option>
                <option value="debit">A ser pago</option>
                <option value="money">Dinheiro</option>
                <option value="pix">Pix</option>
            </Select>
            <Price
                type="text"
                placeholder="Valor (R$)"
                value={selectedClient?.parko_app === 1 && index === 0 ? formatCurrency(pagamento.value, 'BRL') : linha.valorPgto}
                onChange={e => handleChange(e, index)}
                onBlur={() => troco(index)}
                disabled={selectedClient?.parko_app === 1 && index === 0 ? true : false}
            />
        </ArrayElement>
    ))
}

export default RenderItem