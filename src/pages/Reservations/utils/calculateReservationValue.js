export const calculateReservationValue = (selectedClient, priceTable) => {

    const dataReservaDoCliente = selectedClient?.data_entrada ?? ""
    const horaReservaDoCliente = selectedClient?.hora_entrada ?? ""
    const [day, month, year] = dataReservaDoCliente.split("/")
    
    const converterData = new Date(`${year}-${month}-${day} ${horaReservaDoCliente}`).getTime()
    const tempoAtual = new Date().getTime()
    const diferenca = tempoAtual - converterData

    const totalHoras = ((new Date(diferenca).getUTCDate() - 1) * 24) + new Date(diferenca).getUTCHours()

    const valorDaReservaAtual = totalHoras >= 1
        ? ((priceTable?.valor_fracao_hora ?? 0) * totalHoras) + (selectedClient?.value ?? 0)
        : selectedClient?.value ?? 0

    return { totalHoras, valorDaReservaAtual, diferenca }
}