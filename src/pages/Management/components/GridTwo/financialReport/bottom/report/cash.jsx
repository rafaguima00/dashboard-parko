import { Block, Table, Head, Th, Td } from "../style"
import { cashFlow } from "../../../../../map/cashFlow"
import { formatCurrency } from "../../../../../../../utils/FormatCurrency"

const ReportCash = (props) => {

    const { cancelColor, primaryColor } = props.colors

    const flow = (entrance, exit) => {
        return formatCurrency(entrance - exit, 'BRL')
    }

    return (
        <Block>
            <Table>
                <Head textcolor="#bababa">
                    <tr>
                        <Th>Mês</Th>
                        <Th>Entradas</Th>
                        <Th>Saídas</Th>
                        <Th>Fluxo de Caixa</Th>
                    </tr>
                </Head>
                <tbody>
                    {cashFlow.map(item => (
                        <tr>
                            <Td textcolor="#7c7c7c">{item.month}</Td>
                            <Td textcolor={primaryColor}>{formatCurrency(item.entrance, 'BRL')}</Td>
                            <Td textcolor={cancelColor}>{formatCurrency(item.exit, 'BRL')}</Td>
                            <Td textcolor="#7c7c7c">{flow(item.entrance, item.exit)}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Block>
    )
}

export default ReportCash