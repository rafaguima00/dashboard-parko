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
import ReportClient from "./bottom/report/client"
import ReportCosts from "./bottom/report/costs"
import { useFluxoDeCaixa } from "../../../../../hooks/useFluxoDeCaixa"
import { useUser } from "../../../../../context/globalContext"

const FinancialReport = (props) => {

    const { dataClient } = useUser()
    const { bqSelected } = props
    const { neutralColor } = theme

    const {
        totalFinal,
        despesasPorMes,
        aportes,
        retiradas,
        recebimentos,
        reload
    } = useFluxoDeCaixa(dataClient.id_establishment)

    const [graphic, setGraphic] = useState(true)
    const [tabelaDeFaturamento, setTabelaDeFaturamento] = useState("fluxo_de_caixa")

    useEffect(() => {
        reload()
    }, [])

    return (
        <Span>
            <Div height={50}>
                {bqSelected === 0 && <Cash neutralColor={neutralColor} setTabelaDeFaturamento={setTabelaDeFaturamento} />}
                {bqSelected === 1 && <Client neutralColor={neutralColor}/>}
                {bqSelected === 2 && <Costs neutralColor={neutralColor}/>}
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
                            {bqSelected === 0 && <GraphicFlow/>}
                            {bqSelected === 1 && <GraphicClient/>}
                            {bqSelected === 2 && <GraphicCosts/>}
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
                                />
                            }
                            {bqSelected === 1 && <ReportClient/>}
                            {bqSelected === 2 && <ReportCosts/>}
                        </>
                    }

                    <Button font={16} textcolor="#c7c7c7">
                        <p>Clique aqui para baixar</p>
                        <FiDownload color="#c7c7c7" size={21} />
                    </Button>
                </Footer>
            </Div>
        </Span>
    )
}

export default FinancialReport