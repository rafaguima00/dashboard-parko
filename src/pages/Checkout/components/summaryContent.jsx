import { useUser } from "../../../context/globalContext"
import { Summary, Header, Pg, InfoCheckout, Info } from "../style"
import avatar from "../../../assets/avatar.png"
import { theme } from "../../../theme/theme"
import { formatCurrency } from "../../../utils/FormatCurrency"
import { useEffect } from "react"
import api from "../../../services/api/server"

const SummaryContent = (props) => {

    const { 
        dataClient, 
        caixaAberto, 
        setCaixaAberto, 
        setResumoVendas, 
        resumoVendas, 
        setValorDoCaixa,
        dividasEmDinheiro,
        setDividasEmDinheiro
    } = useUser()
    const { email, colaborator } = dataClient
    const { valoresAporte,  valoresRetiradas, filtrarPorData } = props.resumo
    const { cancelColor, neutralColor, primaryColor } = theme

    const unformatCurrency = (num) => {
        return num.replace(/[^\d]/g, "")
    }

    async function verificarCaixa() {
        await api.get(`/abertura_caixa/parking/${dataClient.id_establishment}`)
        .then(res => {
            setCaixaAberto(res.data[res.data.length - 1])
        })
        .catch(e => {
            setCaixaAberto(e)
        })
    }

    async function buscarCaixa() {
        try {
            const response = await api.get(`/abertura_caixa/parking/${dataClient.id_establishment}`)
            const caixas = response.data

            const dataFechamento = caixas.find(item => item.data_fechamento === filtrarPorData.resumo)

            if (!dataFechamento || !dataFechamento.data_fechamento) {
                const dataAbertura = caixas.find(item => item.data_abertura === filtrarPorData.resumo)
                setCaixaAberto(dataAbertura || null)
            } else {
                setCaixaAberto(dataFechamento)
            }
        } catch (e) {
            setCaixaAberto(null)
            console.error("Erro ao buscar caixa:", e)
        }
    }

    async function resumoDeVendas() {
        await api.get(`/payment/${dataClient.id_establishment}`)
        .then(res => {
            setResumoVendas(res.data)
        })
        .catch(e => {
            setResumoVendas(`Erro ao carregar resumo de vendas: ${e}`)
        })
    }

    function mapVendas(payment_method) {
        const filtrarData = resumoVendas.filter(item => item.data === filtrarPorData.resumo)
        const formaDePagamento = filtrarData.filter(item => item.payment_method === payment_method)

        if (payment_method === "total") {
            const totalVendas = filtrarData.map(item => item.value)
                .reduce((prev, current) => prev + current, 0)

            return formatCurrency(totalVendas, 'BRL')
        }

        if (formaDePagamento.length > 0) {
            const somarVendas = formaDePagamento.map(item => item.value)
                .reduce((prev, current) => prev + current, 0)
                
            return formatCurrency(somarVendas, 'BRL')
        }

        return formatCurrency(0, 'BRL')
    }

    async function verificarDividas() {
        await api.get(`/debts/${dataClient.id_establishment}`)
        .then(res => {
            setDividasEmDinheiro(res.data)
        })
        .catch(e => {
            setDividasEmDinheiro(e)
        })
    }

    function organizarDividas() {
        const filterDebts = dividasEmDinheiro?.filter(
            item => item.status === "Pago" && 
            item.payment_method === "money" && 
            item.date_updated?.split(",")[0] === filtrarPorData.resumo
        )

        const plusValues = filterDebts
            .map(item => item.value)
            .reduce((prev, current) => {
                return prev + current
            }, 0)

        return plusValues ? formatCurrency(plusValues, 'BRL') : formatCurrency(0, 'BRL')
    }

    function calcularValorDoCaixa() {

        const vendasEmDinheiro = unformatCurrency(mapVendas("money")) / 100
        const pagamentoDeDividas = unformatCurrency(organizarDividas()) / 100
        const ganhos = vendasEmDinheiro + pagamentoDeDividas + valoresAporte

        const total = ganhos - valoresRetiradas

        if (caixaAberto?.aberto === 1) {
            setValorDoCaixa((caixaAberto?.valor_abertura ?? 0) + total)
        }
    }

    useEffect(() => {
        if (dataClient.id_establishment && resumoVendas) {
            verificarCaixa()
            resumoDeVendas()
            verificarDividas()
        }
    }, [dataClient.id_establishment])

    useEffect(() => {
        if (dividasEmDinheiro && dividasEmDinheiro.length > 0) {
            organizarDividas()
        }
    }, [dividasEmDinheiro])

    useEffect(() => {
        if (resumoVendas.length > 0 && dividasEmDinheiro.length >= 0) {
            calcularValorDoCaixa()
        }
    }, [resumoVendas, dividasEmDinheiro, valoresAporte, valoresRetiradas])

    useEffect(() => {
        if (filtrarPorData.resumo) {
            buscarCaixa()
        }
    }, [filtrarPorData.resumo])

    return (
        <Summary>
            <Header>
                <img src={dataClient.image ? dataClient.image : avatar} alt="Avatar" />
                <div>
                    <Pg><strong>Responsável: </strong>{colaborator}</Pg>
                    <Pg><strong>E-mail: </strong>{email}</Pg>
                    <Pg>
                        <strong>Abertura do caixa: </strong>
                        {`${caixaAberto?.data_abertura ?? ""}, ${caixaAberto?.hora_abertura ?? ""}`}
                    </Pg>
                    <Pg>
                        <strong>Fechamento do caixa: </strong>
                        {`${caixaAberto?.data_fechamento ?? ""}, ${caixaAberto?.hora_fechamento ?? ""}`}
                    </Pg>
                    <Pg><strong>Valor da abertura (dinheiro): </strong>{formatCurrency(caixaAberto?.valor_abertura ?? 0, 'BRL')}</Pg>
                    <Pg>
                        <strong>Valor do fechamento (dinheiro): </strong>{formatCurrency(caixaAberto?.valor_fechamento ?? 0, 'BRL')}
                    </Pg>
                </div>
            </Header><hr/>
            <InfoCheckout>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Abertura do caixa</p>
                    <p>{formatCurrency(caixaAberto?.valor_abertura ?? 0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={primaryColor} textcolor={neutralColor}>
                    <p>Vendas em dinheiro</p>
                    <p>{mapVendas("money")}</p>
                </Info>
                <Info pricetxtcolor={primaryColor} textcolor={neutralColor}>
                    <p>Recebimento de dívidas (dinheiro)</p>
                    <p>{organizarDividas()}</p>
                </Info>
                <Info pricetxtcolor={primaryColor} textcolor={neutralColor}> 
                    <p>Aportes</p>
                    <p>{formatCurrency(valoresAporte, 'BRL')}</p> 
                </Info>
                <Info pricetxtcolor={cancelColor} textcolor={neutralColor}> 
                    <p>Retiradas</p>
                    <p>{formatCurrency(valoresRetiradas, 'BRL')}</p> 
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor="#000">
                    <p>Fechamento do caixa</p>
                    <p>{formatCurrency(caixaAberto?.valor_fechamento ?? 0, 'BRL')}</p>
                </Info>
            </InfoCheckout><hr/>
            <InfoCheckout>
                <h3>Resumo de vendas</h3>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Dinheiro</p>
                    <p>{mapVendas("money")}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Pix</p>
                    <p>{mapVendas("pix")}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Débito</p>
                    <p>{mapVendas("debit_card")}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Crédito</p>
                    <p>{mapVendas("credit_card")}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>A pagar</p>
                    <p>{mapVendas("debit")}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor="#000">
                    <p>Total</p>
                    <p>{mapVendas("total")}</p>
                </Info>
            </InfoCheckout>
        </Summary>
    )
}

export default SummaryContent