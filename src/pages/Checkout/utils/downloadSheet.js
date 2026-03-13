import api from "../../../services/api/server"
import { formatCurrency } from "../../../utils/FormatCurrency"
import * as XLSX from "xlsx"

export const mapVendas = (payment_method, resumoVendas, filtrarPorData) => {
    const filtrarData = resumoVendas.filter(item => item.data === filtrarPorData)
    const formaDePagamento = filtrarData.filter(item => item.payment_method === payment_method)

    if (payment_method === "total") {
        const totalVendas = filtrarData
            .map(item => item.value)
            .reduce((prev, current) => prev + current, 0)

        return formatCurrency(totalVendas, 'BRL')
    }

    if (formaDePagamento.length > 0) {
        const somarVendas = formaDePagamento
            .map(item => item.value)
            .reduce((prev, current) => prev + current, 0)
            
        return formatCurrency(somarVendas, 'BRL')
    }

    return formatCurrency(0, 'BRL')
}

export const organizarDividas = (dividasEmDinheiro, filtrarPorData) => {
    const filterDebts = dividasEmDinheiro?.filter(
        item => item.status === "Pago" && 
        item.payment_method === "money" && 
        item.date_updated?.split(",")[0] === filtrarPorData
    )

    const plusValues = filterDebts
        .map(item => item.value)
        .reduce((prev, current) => {
            return prev + current
        }, 0)

    return plusValues ? formatCurrency(plusValues, 'BRL') : formatCurrency(0, 'BRL')
}

export const handleDownloadValorDoCaixa = (e, dataClient, caixaAberto, valoresAporte, valoresRetiradas) => {
    e.preventDefault()

    const dados = {
        responsavel: dataClient.colaborator,
        email: dataClient.email,
        abertura: caixaAberto?.data_abertura && `${caixaAberto?.data_abertura ?? ""}, ${caixaAberto?.hora_abertura ?? ""}`,
        fechamento: caixaAberto?.data_fechamento && `${caixaAberto?.data_fechamento ?? ""}, ${caixaAberto?.hora_fechamento ?? ""}`,
        valor_da_abertura: formatCurrency(caixaAberto?.valor_abertura ?? 0, 'BRL'),
        valor_do_fechamento: formatCurrency(caixaAberto?.valor_fechamento ?? 0, 'BRL')
    }

    const caixa = {
        valor_da_abertura: formatCurrency(caixaAberto?.valor_abertura ?? 0, 'BRL'),
        vendas_em_dinheiro: mapVendas("money"),
        recebimento_de_dividas_em_dinheiro: organizarDividas(),
        aportes: formatCurrency(valoresAporte, "BRL"),
        retiradas: formatCurrency(valoresRetiradas, "BRL"),
        valor_do_fechamento: formatCurrency(caixaAberto?.valor_fechamento ?? 0, 'BRL')
    }

    const resumoDeVendas = {
        dinheiro: mapVendas("money"),
        pix: mapVendas("pix"),
        debito: mapVendas("debit_card"),
        credito: mapVendas("credit_card"),
        a_pagar: mapVendas("debit"),
        total: mapVendas("total")
    }

    const wb = XLSX.utils.book_new()

    const createSheet = (data, text) => {
        const ws = XLSX.utils.json_to_sheet([data])
        XLSX.utils.book_append_sheet(wb, ws, text)
    }

    createSheet(dados, "Dados")
    createSheet(caixa, "Fechamento do caixa")
    createSheet(resumoDeVendas, "Resumo de vendas")

    XLSX.writeFile(wb, `Resumo de vendas ${dataClient.establishment} ${caixaAberto?.data_abertura}.xlsx`)
}

export const handleDownloadReservation = async (dataClient, reservaFechada) => {
    const response = await api.get(`/payment/${dataClient.id_establishment}`)
    const payments = response.data

    const pagamentoPorReserva = reservaFechada.map(item => {
        return payments.filter(p => p.id_reservation === item.id)
    })

    const wb = XLSX.utils.book_new()

    const wsReservas = XLSX.utils.json_to_sheet(reservaFechada)
    XLSX.utils.book_append_sheet(wb, wsReservas, "Reservas")

    const pagamentos = pagamentoPorReserva.flat()
    const wsPagamentos = XLSX.utils.json_to_sheet(pagamentos)
    XLSX.utils.book_append_sheet(wb, wsPagamentos, "Pagamentos")

    XLSX.writeFile(
        wb,
        `Reservas e Pagamentos ${dataClient.establishment}, ${reservaFechada[0].data_saida}.xlsx`
    )
}