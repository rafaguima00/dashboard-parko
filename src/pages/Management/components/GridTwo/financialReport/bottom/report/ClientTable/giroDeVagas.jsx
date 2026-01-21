import { Div, Span } from "../../style"

const GiroDeVagas = (props) => {

    const { 
        mediaPessoasPorDia, 
        mes, 
        ano, 
        ocupacao,
        faturamento,
        mesAnoFaturamento,
        mediaDiariaFaturamento
    } = props

    return <>
        <Span>
            <Div>
                <p>Faturamento Mensal</p>
                <hr/>
                <span>
                    Média de {faturamento} por dia no mês
                </span>
            </Div>
            <Div>
                <p>Ocupação Mensal</p>
                <hr/>
                <span>
                    Média de {ocupacao} pessoas por dia no mês
                </span>
            </Div>
            <Div>
                <p>Mês historicamente de maior Faturamento</p>
                <hr/>
                <span>
                    <p>{mesAnoFaturamento}</p>
                    <p>Média de {mediaDiariaFaturamento} por dia no mês</p>
                </span>
            </Div>
            <Div>
                <p>Mês historicamente de maior Ocupação</p>
                <hr/>
                <span>
                    <p>{mes}/{ano}</p>
                    <p>Média de {mediaPessoasPorDia} pessoas por dia no mês</p>
                </span>
            </Div>
        </Span>
    </>
}

export default GiroDeVagas