import { theme } from "../../../../../../../../theme/theme"
import { formatCurrency } from "../../../../../../../../utils/FormatCurrency"
import { Head, Td, Th } from "../../style"

const AportesSangrias = (props) => {

    const { result, aportes, retiradas } = props
    const { cancelColor, primaryColor } = theme

    const relatorioMensal = (month, total) => {
        const mapArr = total.filter(item => item.mes.split("/")[0] === month)
        return formatCurrency(mapArr[0]?.total, "BRL")
    }

    const anoRelatorio = (month, total) => {
        const mapArr = total.filter(item => item.mes.split("/")[0] === month)
        const ano = mapArr[0]?.mes.split("/")[1]
        return ano
    }

    const saldoFinal = (month, aportes, retiradas) => {
        const mapApo = aportes.filter(item => item.mes.split("/")[0] === month)
        const totalAporte = mapApo[0]?.total

        const mapRet = retiradas.filter(item => item.mes.split("/")[0] === month)
        const totalRetirada = mapRet[0]?.total

        return formatCurrency(totalAporte - totalRetirada, "BRL")
    }

    return <>
        <Head textcolor="#bababa">
            <tr>
                <Th>Mês</Th>
                <Th>Ano</Th>
                <Th>Aportes</Th>
                <Th>Sangrias</Th>
                <Th>Saldo</Th>
            </tr>
        </Head>
        <tbody>
            {result.map(item => (
                <tr>
                    <Td textcolor="#7c7c7c">{item.month}</Td>
                    <Td textcolor="#7c7c7c">{anoRelatorio(item.month, aportes)}</Td>
                    <Td textcolor={primaryColor}>{relatorioMensal(item.month, aportes)}</Td>
                    <Td textcolor={cancelColor}>{relatorioMensal(item.month, retiradas)}</Td>
                    <Td textcolor="#7c7c7c">{saldoFinal(item.month, aportes, retiradas)}</Td>
                </tr>
            ))}
        </tbody>
    </>
}

export default AportesSangrias