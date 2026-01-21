import FinancialReport from "./financialReport/financialReport"
import Accounts from "./accounts/accounts"
import Heritage from "./heritage/heritage"
import Occurrence from "./occurrence/occurrence"
import { DivInput, Financial, Input } from "../../style"
import Top from "../../../../components/Top"
import { useUser } from "../../../../context/globalContext"
import { theme } from "../../../../theme/theme"
import { useEffect, useState } from "react"

const GridTwo = (props) => {

    const { selected, bqSelected } = props.states
    const { 
        dataClient, 
        occurrences, 
        setOccurrences 
    } = useUser()
    const { type_colaborator } = dataClient
    const { primaryColor } = theme

    const [dataDeInicio, setDataDeInicio] = useState("")
    const [dataDeTermino, setDataDeTermino] = useState("")
    const [dataFilter, setDataFilter] = useState(false)
    const [diferencaDeMesesParaHoje, setDiferencaDeMesesParaHoje] = useState()

    const titleSelected = () => {
        switch (selected) {
            case 0 :
                return "Relatórios Financeiros"
            case 1 :
                return "Registros de Movimentações Financeiras"
            case 2 :
                return "Registro de Patrimônio"
            default :
                return "Registro de Ocorrências"
        }
    }

    const title = titleSelected()

    const diferencaDeMeses = () => {
        const inicio = new Date(dataDeInicio)
        const hoje = new Date()

        setDiferencaDeMesesParaHoje((hoje.getFullYear() - inicio.getFullYear()) * 12 +
        (hoje.getMonth() - inicio.getMonth()))
    }

    useEffect(() => {
        if (dataDeInicio !== "" || dataDeTermino !== "") {
            setDataFilter(true)
            diferencaDeMeses()
        }
    }, [dataDeInicio, dataDeTermino])
    
    return (
        <>
            <Top children={title} font={19} gridcolumn={2} gridrow={1}/>
            {
                (type_colaborator !== "Funcionário(a)") && (selected === 0 &&
                    <DivInput>
                        <Input 
                            type="date"
                            bordercolor={primaryColor}
                            value={dataDeInicio}
                            onChange={e => setDataDeInicio(e.target.value)}
                        />
                        <Input 
                            type="date"
                            bordercolor={primaryColor}
                            value={dataDeTermino}
                            onChange={e => setDataDeTermino(e.target.value)}
                        />
                    </DivInput>
                )
            }
            {selected === 3 && <Top children={"Formulário de Ocorrências"} font={19} gridcolumn={3} gridrow={1}/>}
            <Financial gridcolumn={"span 2"} gridrow={"span 2"}>
                { 
                    (type_colaborator !== "Funcionário(a)") && (selected === 0 && 
                        <FinancialReport 
                            bqSelected={bqSelected} 
                            dataDeInicio={dataDeInicio}
                            dataDeTermino={dataDeTermino}
                            dataFilter={dataFilter}
                            diferencaDeMesesParaHoje={diferencaDeMesesParaHoje}
                        />
                    ) 
                }
                { selected === 1 && <Accounts/> }
                { selected === 2 && <Heritage/> }
                { selected === 3 && <Occurrence state={{ occurrences, setOccurrences }} dataClient={dataClient} /> }
            </Financial>
        </>
        
    )
}

export default GridTwo