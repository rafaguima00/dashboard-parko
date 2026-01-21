import { Div, Span, Icon, Footer, Button } from "../../../style"
import { GoArrowSwitch } from "react-icons/go"
import { FiDownload } from "react-icons/fi"
import Cash from "./subComponents/cash"
import Client from "./subComponents/client"
import Costs from "./subComponents/costs"
import General from "./subComponents/general"
import HeritageAndStock from "./subComponents/heritageAndStock"
import { theme } from "../../../../../theme/theme"
import ReportCash from "./bottom/report/Cash/cash"
import { useEffect, useState } from "react"
import GraphicFlow from "./bottom/graphics/cash/cash"
import GraphicClient from "./bottom/graphics/costumer/client"
import GraphicCosts from "./bottom/graphics/costs/costs"
import ReportClient from "./bottom/report/ClientTable/client"
import ReportCosts from "./bottom/report/Costs/costs"
import { useFluxoDeCaixa } from "../../../../../hooks/useFluxoDeCaixa"
import { useUser } from "../../../../../context/globalContext"
import api from "../../../../../services/api/server"
import useExport from "./hooks/useExport"

const FinancialReport = (props) => {

    const { dataClient, setAccounts, accounts } = useUser()
    const { 
        bqSelected, 
        dataDeInicio, 
        dataFilter, 
        dataDeTermino,
        diferencaDeMesesParaHoje
    } = props
    const { neutralColor } = theme

    const {
        totalFinal,
        despesasPorMes,
        aportes,
        retiradas,
        recebimentos,
        reload
    } = useFluxoDeCaixa(dataClient.id_establishment, diferencaDeMesesParaHoje)

    const { 
        exportRelatorioDeAportesESangrias, 
        exportRelatorioDeFluxoDeCaixa, 
        exportRelatorioDeRecebimentos 
    } = useExport()

    const [graphic, setGraphic] = useState(true)
    const [tabelaDeFaturamento, setTabelaDeFaturamento] = useState("fluxo_de_caixa")
    const [tabelaDeClientes, setTabelaDeClientes] = useState("geral_de_faturamento")
    const [tabelaDeContas, setTabelaDeContas] = useState("geral_de_contas")

    const loadAccounts = async () => {
        const response = await api.get(`/accounts`)
        setAccounts(response.data)
    }

    const parseDateBR = (dateString) => {
        if (!dateString) return null

        const [datePart, timePart] = dateString.split(", ")

        const [day, month, year] = datePart.split("/").map(Number)

        if (timePart) {
            const [hour, minute] = timePart.split(":").map(Number)
            return new Date(year, month, day, hour, minute)
        }

        const dataFinal = new Date(year, month, day)
        const ano = dataFinal.getFullYear()
        const mes = dataFinal.getMonth()
        const dia = dataFinal.getDate()

        return `${ano}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`
    }

    const filterAccounts = () => {
        return accounts.filter(item => {
            if (
                item.category === "Aporte" ||
                item.id_establishment !== dataClient.id_establishment
            ) return false

            if (dataDeInicio && dataDeTermino) {
                const paymentDate = parseDateBR(item.date_payment)
                if (!paymentDate) return false

                return (
                    paymentDate >= dataDeInicio &&
                    paymentDate <= dataDeTermino
                )
            }

            return true
        })
    }

    const baixarRelatorio = () => {
        if (bqSelected === 0 && tabelaDeFaturamento === "fluxo_de_caixa") {
            exportRelatorioDeFluxoDeCaixa()
            return
        }

        if (bqSelected === 0 && tabelaDeFaturamento === "aportes_e_sangrias") {
            exportRelatorioDeAportesESangrias()
            return
        }

        if (bqSelected === 0 && tabelaDeFaturamento === "recebimentos") {
            exportRelatorioDeRecebimentos()
            return
        }
    }

    const filterAcc = filterAccounts()

    useEffect(() => {
        reload()
        loadAccounts()
    }, [])

    useEffect(() => {
        if (accounts.length > 0) {
            filterAccounts()
        }
    }, [accounts])

    return (
        <Span>
            <Div height={50}>
                {bqSelected === 0 && <Cash neutralColor={neutralColor} setTabelaDeFaturamento={setTabelaDeFaturamento} />}
                {bqSelected === 1 && <Client neutralColor={neutralColor} setTabelaDeClientes={setTabelaDeClientes} />}
                {bqSelected === 2 && <Costs neutralColor={neutralColor} setTabelaDeContas={setTabelaDeContas} />}
                {bqSelected === 3 && <HeritageAndStock neutralColor={neutralColor}/>}
                {bqSelected === 4 && <General neutralColor={neutralColor}/>}
            </Div>
            <Div height={50}>
                <Icon onClick={() => setGraphic(!graphic)}>
                    <GoArrowSwitch size={17} />
                </Icon>
                <Footer>

                    {graphic ? 
                        <> 
                            {bqSelected === 0 && <GraphicFlow />}
                            {bqSelected === 1 && <GraphicClient />}
                            {bqSelected === 2 && <GraphicCosts />}
                        </> : 
                        <>
                            {bqSelected === 0 && 
                                <ReportCash 
                                    tabelaDeFaturamento={tabelaDeFaturamento} 
                                    totalFinal={totalFinal} 
                                    despesasPorMes={despesasPorMes}
                                    aportes={aportes}
                                    retiradas={retiradas}
                                    recebimentos={recebimentos}
                                    dataDeInicio={dataDeInicio}
                                    dataDeTermino={dataDeTermino}
                                    dataFilter={dataFilter}
                                />
                            }
                            {bqSelected === 1 && 
                                <ReportClient 
                                    tabelaDeClientes={tabelaDeClientes}
                                />
                            }
                            {bqSelected === 2 && 
                                <ReportCosts 
                                    filterAcc={filterAcc} 
                                    tabelaDeContas={tabelaDeContas}
                                />
                            }
                        </>
                    }

                    <Button font={16} textcolor="#c7c7c7" onClick={baixarRelatorio}>
                        <p>Clique aqui para baixar</p>
                        <FiDownload color="#c7c7c7" size={21} />
                    </Button>
                </Footer>
            </Div>
        </Span>
    )
}

export default FinancialReport