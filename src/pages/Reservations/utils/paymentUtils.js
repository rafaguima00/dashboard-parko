import { unformatCurrency } from "../../../utils/UnformatCurrency"

export const valueToPay = (valueSelect, valorPgto, trocoCliente) => {
    if (valueSelect === "money") {
        const valorFinal = (unformatCurrency(valorPgto) / 100) - trocoCliente
        return valorFinal.toFixed(2)
    }
    const valorFinal = unformatCurrency(valorPgto) / 100
    return valorFinal.toFixed(2)
}

export const statusPayment = (valueSelect) => {
    return valueSelect === "debit" ? "pending" : "approved"
}
