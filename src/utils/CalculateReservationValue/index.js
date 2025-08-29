export const normalizeDate = (dateStr) => {
    if (!dateStr) return ""

    if (dateStr.includes("-")) {
        return dateStr
    }

    if (dateStr.includes("/")) {
        const [dd, mm, yyyy] = dateStr.split("/")
        return `${yyyy}-${mm}-${dd}`
    }

    return dateStr
}

const toNumber = (x) => {
    if (x == null) return 0
    if (typeof x === "number") return x
    if (typeof x === "string") {
        // lida com "1.234,56" e "5,00"
        const cleaned = x.replace(/\./g, "").replace(",", ".")
        const n = Number(cleaned)
        return Number.isFinite(n) ? n : 0
    }
    return Number(x) || 0
}

const verifyTypeOfCharge = (item, priceTable, tabelaFixa, totalHoras, diferenca, charge) => {
    const clienteParko = item?.parko_app === 1
    const valorHora = toNumber(priceTable?.valor_hora)
    const valorFracao = toNumber(priceTable?.valor_fracao_hora)
    const temFracao = diferenca % 3600000 !== 0

    if (clienteParko) {
        return item?.value ?? 0
    }

    if (charge === "tabela_fixa") {
        const maxEnd = tabelaFixa.reduce((max, item) => {
            const [endH, endM] = item.segunda_hora.split(":").map(Number)
            const endMs = endH * 60 * 60 * 1000 + endM * 60 * 1000
            return Math.max(max, endMs)
        }, 0)

        
        if (diferenca >= maxEnd) {
            return (priceTable?.valor_hora ?? 0) * totalHoras + (totalHoras === 1 ? 0 : (diferenca % 3600000 === 0 ? 0 : priceTable?.valor_fracao_hora)) 
        }

        const valorFinal = tabelaFixa.find(item => {
            const [startH, startM] = item.primeira_hora.split(":").map(Number)
            const [endH, endM] = item.segunda_hora.split(":").map(Number)

            const startMs = startH * 60 * 60 * 1000 + startM * 60 * 1000
            const endMs = endH * 60 * 60 * 1000 + endM * 60 * 1000


            return diferenca >= startMs && diferenca < endMs
        })
        
        return valorFinal?.value
    }

    if (charge === "hora_fracao") {
        if (totalHoras >= 1 && diferenca >= 0) {
            return (valorHora * totalHoras) + (totalHoras === 1 ? 0 : (temFracao ? valorFracao : 0))
        }

        return valorHora
    }
}

export const calculateReservationValue = (item, priceTable, tabelaFixa, charge) => {

    const dataSaidaDoCliente = item?.data_saida ?? ""
    const horaSaidaDoCliente = item?.hora_saida ?? ""
    const dataHoraDeSaidaExistente = dataSaidaDoCliente !== "" && horaSaidaDoCliente !== ""
    const dataReservaDoCliente = item?.data_entrada ?? ""
    const horaReservaDoCliente = item?.hora_entrada ?? ""

    const normalizedDataReserva = normalizeDate(dataReservaDoCliente)
    const normalizedDataSaida = normalizeDate(dataSaidaDoCliente)

    const converterDataDeEntrada = new Date(`${normalizedDataReserva} ${horaReservaDoCliente}`).getTime()
    const converterDataDeSaida = new Date(`${normalizedDataSaida} ${horaSaidaDoCliente}`).getTime()
    const tempoAtual = new Date().getTime()

    const diferenca = dataHoraDeSaidaExistente
        ? converterDataDeSaida - converterDataDeEntrada
        : tempoAtual - converterDataDeEntrada

    const totalHoras = Math.floor(diferenca / (1000 * 60 * 60))

    const valorDaReservaAtual = verifyTypeOfCharge(item, priceTable, tabelaFixa, totalHoras, diferenca, charge)

    return { totalHoras, valorDaReservaAtual, diferenca }
}