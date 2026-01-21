import { formatCurrency } from "../../../../../../../../utils/FormatCurrency"
import { Head, Table, Td, Th } from "../../style"

const GeralDeContas = (props) => {

    const { filterAcc } = props

    const dataDaConta = (dataAccount) => {
        
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]

        const dateCreated = dataAccount.split(",")[0]
        const mes = dateCreated.split("/")[1]
        const ano = dateCreated.split("/")[2]
        
        const mesAno = `${meses[mes - 1]}/${ano}`

        return mesAno
    }

    const contaPaga = (item) => {
        if (item.status === "Pago") return formatCurrency(item.value, 'BRL')

        return formatCurrency(0, 'BRL')
    }

    return <>
        <Table>
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
                {filterAcc?.map(item => (
                    <tr>
                        <Td textcolor="#7c7c7c">{item.desc_item} - {dataDaConta(item.date_created)}</Td>
                        <Td textcolor="#7c7c7c">{item.date_created.split(",")[0]}</Td>
                        <Td textcolor="#7c7c7c">{item.date_payment.split(",")[0]}</Td>
                        <Td textcolor="#7c7c7c">{item.date_payment.split(",")[0]}</Td>
                        <Td textcolor="#7c7c7c">{formatCurrency(item.value, 'BRL')}</Td>
                        <Td textcolor="#7c7c7c">{contaPaga(item)}</Td>
                        <Td textcolor="#7c7c7c">{item.status}</Td>
                        <Td textcolor="#7c7c7c">{item.cost}</Td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}

export default GeralDeContas