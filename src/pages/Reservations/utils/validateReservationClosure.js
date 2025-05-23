export const validateReservationClosure = ({
    selectedClient,
    paymentLines,
    valorTotal,
    unformatCurrency,
}) => {
    if (selectedClient?.status === "Recusado") {
        return { 
            valid: false, 
            message: "Esta reserva foi marcada como recusada. Para conclui-la preencha o PIN na página principal" 
        }
    }

    if (selectedClient?.status === "Pendente") {
        return { 
            valid: false, 
            message: `Esta reserva está marcada como Pendente. Confirme a reserva do cliente ${selectedClient?.name} na página principal antes de fechar a reserva` 
        }
    }

    if (!selectedClient?.data_saida || !selectedClient?.hora_saida) {
        return { 
            valid: false, 
            message: "É necessário preencher o horário de saída do cliente" 
        }
    }

    const valores = paymentLines.map(item => unformatCurrency(item.valorPgto)/100)
    if (valores.some(item => item === 0)) {
        return { 
            valid: false, 
            message: "Preencha o campo vazio" 
        }
    }

    const unformatTotal = unformatCurrency(valorTotal())/100
    const somarValores = valores.reduce((prev, current) => prev + current, 0)

    if (somarValores < unformatTotal) {
        return { 
            valid: false, 
            message: "Somente fechar a reserva quando tiver todas as formas de pagamento compreendendo o valor total da reserva" 
        }
    }
    const optionMoney = paymentLines.some(item => item.valueSelect === "money")
    if (somarValores > unformatTotal && !optionMoney) {
        return { 
            valid: false, 
            message: "O valor informado não pode ser maior que o valor total da reserva caso o pagamento não seja feito em dinheiro" 
        }
    }

    return { valid: true }
}