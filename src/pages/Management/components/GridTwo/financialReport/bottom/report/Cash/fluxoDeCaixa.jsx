import { formatCurrency } from "../../../../../../../../utils/FormatCurrency"
import { theme } from "../../../../../../../../theme/theme"
import { Head, Td, Th } from "../../style"
import { useEffect, useState } from "react"
import api from "../../../../../../../../services/api/server"
import { useUser } from "../../../../../../../../context/globalContext"

const FluxoDeCaixa = (props) => {

    const [fluxoDeCaixa, setValorFluxoDeCaixa] = useState([])

    const { dataClient } = useUser()
    const { primaryColor, cancelColor } = theme
    const { 
        result,
        totalFinal, 
        despesasPorMes, 
        dataDeInicio,
        dataDeTermino,
        resultado
    } = props

    const relatorioMensal = (month, total) => {
        const mapArr = total.filter(item => item.mes.split("/")[0] === month)
        return formatCurrency(mapArr[0]?.total, 'BRL')
    }

    const aberturaCaixa = async () => {
        const result = await api.get(`/abertura_caixa/parking/${dataClient.id_establishment}`)

        getLastClosurePerMonth(result.data)
    }

    const getLastClosurePerMonth = (array) => {
        const map = {}

        array.forEach(item => {
            if (!item.data_fechamento) return

            const [dd, mm, yyyy] = item.data_fechamento.split("/")
            const key = `${mm}-${yyyy}`

            const currentDay = Number(dd)

            if (!map[key]) {
                map[key] = item
            } else {
                
                const [storedDay] = map[key].data_fechamento.split("/")
                if (currentDay > Number(storedDay)) {
                    map[key] = item
                }
            }
        })

        setValorFluxoDeCaixa(Object.values(map))
    }

    const balance = (num) => {
        const result = fluxoDeCaixa.filter(item => item.data_fechamento.split("/")[1] === num.code)

        return result[0]?.valor_fechamento ? formatCurrency(result[0]?.valor_fechamento, 'BRL') : formatCurrency(0, 'BRL')
    }

    useEffect(() => {
        aberturaCaixa()
    }, [])

    return <>
        <Head textcolor="#bababa">
            <tr>
                <Th>Mês</Th>
                <Th>Entradas</Th>
                <Th>Saídas</Th>
                <Th>Fluxo de Caixa</Th>
            </tr>
        </Head>
        <tbody>
            {result.map(item => (
                <tr>
                    <Td textcolor="#7c7c7c">{item.month}</Td>
                    <Td textcolor={primaryColor}>{relatorioMensal(item.month, totalFinal)}</Td>
                    <Td textcolor={cancelColor}>{relatorioMensal(item.month, despesasPorMes)}</Td>
                    <Td textcolor="#7c7c7c">{balance(item)}</Td>
                </tr>
            ))}
        </tbody>
    </>
}

export default FluxoDeCaixa