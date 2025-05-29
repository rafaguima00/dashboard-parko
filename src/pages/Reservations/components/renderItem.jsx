import { useUser } from "../../../context/globalContext"
import { ArrayElement, Price, Select } from "../style"
import { formatCurrency } from "../../../utils/FormatCurrency"
import { unformatCurrency } from "../../../utils/UnformatCurrency"
import useReservation from "../../../hooks/useReservation"
import { useEffect } from "react"
import usePayment from "../../../hooks/usePayment"
import { checkClientDebts } from "../utils/checkClientDebts"

const RenderItem = (props) => {

    const { paymentLines, setPaymentLines, somarValores, setTrocoCliente, optionMoney } = props.states
    const { selectedClient, valueSelectDebt, resumoVendas, valorAPagar, debts } = useUser()
    const { hasDebt } = checkClientDebts(selectedClient, debts)
    const { valorTotal } = useReservation()
    const { fetchPayments } = usePayment()
    const total = valorTotal()

    const pesquisarPagamento = () => {
        const findPgto = resumoVendas.find(item => item.id_reservation === selectedClient?.id)

        return findPgto
    }

    const pagamento = pesquisarPagamento()

    const valorAPagarPelaDivida = hasDebt && valorAPagar

    const handleSelectChange = (e, index) => {
        const value = e.target.value

        setPaymentLines(paymentLines.map((linha, i) =>
            i === index ? { ...linha, valueSelect: value } : linha
        ))
    }
      
    const handleChange = (e, index) => {
        const rawValue = e.target.value

        if (rawValue === "") return  

        const formatValue = rawValue?.replace(/\D/g, '').slice(0, 6)
        const numericValue = unformatCurrency(formatValue) / 100
        
        setPaymentLines(paymentLines.map((linha, i) =>
            i === index ? { ...linha, valorPgto: formatCurrency(numericValue, 'BRL') } : linha
        ))
    }

    const troco = (index) => {
        const { valorPgto, valueSelect } = paymentLines[index]

        if ((somarValores > total) && (optionMoney.length > 0 || valueSelectDebt === "money")) {
            setTrocoCliente(somarValores - total)
        }

        if (valueSelect !== "money" || valorPgto < 0) {
            setPaymentLines(paymentLines.map((linha, i) =>
                i === index ? { ...linha, trocoCliente: 0 } : linha
            ))
        }
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    useEffect(() => {
        pesquisarPagamento()
    }, [selectedClient])

    return paymentLines.map((linha, index) => (
        <ArrayElement key={index}>
            <Select
                value={
                    selectedClient?.parko_app === 1 && index === 0 ? 
                    pagamento.payment_method : 
                    linha.valueSelect
                }
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
                value={
                    selectedClient?.parko_app === 1 && index === 0 ? 
                    formatCurrency(pagamento.value + valorAPagarPelaDivida, 'BRL') : 
                    linha.valorPgto
                }
                onChange={e => handleChange(e, index)}
                onBlur={() => troco(index)}
            />
        </ArrayElement>
    ))
}

export default RenderItem