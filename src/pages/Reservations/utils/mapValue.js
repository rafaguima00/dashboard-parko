import { formatCurrency } from "../../../utils/FormatCurrency"

export const mapValue = (item, priceTable) => {
    const dataReservaDoCliente = item?.data_entrada ?? ""
    const horaReservaDoCliente = item?.hora_entrada ?? ""
    const [day, month, year] = dataReservaDoCliente.split("/")

    const converterData = new Date(`${year}-${month}-${day} ${horaReservaDoCliente}`).getTime()
    const tempoAtual = new Date().getTime()
    const diferenca = tempoAtual - converterData

    const totalHoras = ((new Date(diferenca).getUTCDate() - 1) * 24) + new Date(diferenca).getUTCHours()

    if(diferenca <= 0) {
        return formatCurrency(item.value, 'BRL')
    }
    
    if(totalHoras >= 1) {
        return formatCurrency(((priceTable?.valor_fracao_hora ?? "") * totalHoras) + (item.value), 'BRL')
    }
    
    return formatCurrency(item.value, 'BRL')
}