import { formatCurrency } from "../../../utils/FormatCurrency"
import { unformatCurrency } from "../../../utils/UnformatCurrency"

export const validateDebt = (e, valorInput, valorSelect, valuesDebt) => {
    e.preventDefault()

    if (unformatCurrency(valorInput)/100 > valuesDebt) {
        alert("O valor informado não pode ser maior que o valor total da dívida")

        return {
            valorInput: formatCurrency(valuesDebt, 'BRL'),
            valorAPagar: valuesDebt,
            valueSelectDebt: valorSelect,
            open: false
        }
    }

    if (unformatCurrency(valorInput)/100 < valuesDebt) {
        alert("Preencha o valor completo da dívida")
        
        return {
            valorInput: formatCurrency(valuesDebt, 'BRL'),
            valorAPagar: valuesDebt,
            valueSelectDebt: valorSelect,
            open: false
        }
    }

    return {
        valorInput: formatCurrency(valorInput, 'BRL'),
        valorAPagar: formatCurrency(valorInput, 'BRL'),
        valueSelectDebt: valorSelect,
        open: false
    }
}