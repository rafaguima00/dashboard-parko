import { Table, Head, Th, Td } from "../style"
import { cashFlow } from "../../../../../map/cashFlow"
import { formatCurrency } from "../../../../../../../utils/FormatCurrency"

const ReportCosts = () => {

    let pend = "Pendente"
    let variable = "Variavel"

    return (
        <div>
            <Table largura="100%">
                <Head textcolor="#bababa">
                    <tr>
                        <Th>Descrição</Th>
                        <Th>Data Registro</Th>
                        <Th>Data Pagamento</Th>
                        <Th>Data Vencimento</Th>
                        <Th>Valor Total</Th>
                        <Th>Valor Pago</Th>
                        <Th>Status</Th>
                        <Th>Tipo</Th>
                    </tr>
                </Head>
                <tbody>
                    {cashFlow.map(item => (
                        <tr>
                            <Td textcolor="#7c7c7c">Conta - Mês</Td>
                            <Td textcolor="#7c7c7c">dd/mm/yyyy</Td>
                            <Td textcolor="#7c7c7c">dd/mm/yyyy</Td>
                            <Td textcolor="#7c7c7c">dd/mm/yyyy</Td>
                            <Td textcolor="#7c7c7c">{formatCurrency((0), 'BRL')}</Td>
                            <Td textcolor="#7c7c7c">{formatCurrency((0), 'BRL')}</Td>
                            <Td textcolor="#7c7c7c">{pend.substring(0, 4)}</Td>
                            <Td textcolor="#7c7c7c">{variable.substring(0, 5)}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ReportCosts