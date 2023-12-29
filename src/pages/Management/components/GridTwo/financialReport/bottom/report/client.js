import { Block, Span, Div, Month } from "../style";
import { formatCurrency } from "../../../../../../../services/formatCurrency";

const ReportClient = () => {

    const reportClient = [
        {
            id: 0,
            month: "January",
            invoicing: 13000,
        },
        {
            id: 1,
            month: "Fevereiro",
            invoicing: 16755,
        },
        {
            id: 2,
            month: "Março",
            invoicing: 10000,
        },
        {
            id: 3,
            month: "Abril",
            invoicing: 12500,
        },
        {
            id: 4,
            month: "Maio",
            invoicing: 10575,
        }
    ]

    const formatItem = reportClient.reduce((prev, current) => {
        return prev.invoicing > current.invoicing ? prev.month : current.month
    })

    return (
        <Block>
            <Span>
                <Div>
                    <p>Faturamento Mensal</p>
                    <hr/>
                    <span>
                        <p>{`Média de ${formatCurrency(1500, 'BRL')} por dia no mês`}</p>
                    </span>
                </Div>
                <Div>
                    <p>Ocupação Mensal</p>
                    <hr/>
                    <span>
                        <p>Média de 100 pessoas por dia no mês 50% da ocupação</p>
                    </span>
                </Div>
                <Div>
                    <p>Mês historicamente de maior Faturamento</p>
                    <hr/>
                    <span>
                        <Month>{formatItem}</Month>
                        <p>{`Média de ${formatCurrency(1700, 'BRL')} por dia no mês`}</p>
                    </span>
                </Div>
                <Div>
                    <p>Mês historicamente de maior Ocupação</p>
                    <hr/>
                    <span>
                        <Month>{formatItem}</Month>
                        <p>Média de 100 pessoas por dia no mês 50% da ocupação</p>
                    </span>
                </Div>
            </Span>
        </Block>
    )
}

export default ReportClient;