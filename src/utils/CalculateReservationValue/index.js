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

export const calculateReservationValue = (item, priceTable) => {

    const clienteParko = item?.parko_app === 1
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

    const totalHoras = ((new Date(diferenca).getUTCDate() - 1) * 24) + new Date(diferenca).getUTCHours()

    const valorDaReservaAtual = totalHoras >= 1 && !clienteParko && diferenca >= 0
        ? ((priceTable?.valor_fracao_hora ?? 0) * totalHoras) + (priceTable?.valor_hora ?? 0)
        : item?.value ?? 0

    return { totalHoras, valorDaReservaAtual, diferenca }
}