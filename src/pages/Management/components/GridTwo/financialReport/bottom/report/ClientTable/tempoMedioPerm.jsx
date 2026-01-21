import { Div, Span } from "../../style"

const TempoMedioPermanencia = (props) => {

    const { 
        faturamento, 
        mesAnoFaturamento, 
        mediaDiariaFaturamento,
        horasOcupadasMensal,
        mesMaiorOcupacao,
        anoMaiorOcupacao,
        mediaHorasPorDia
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
                    Média de {horasOcupadasMensal} horas por dia no mês
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
                    <p>{mesMaiorOcupacao}/{anoMaiorOcupacao}</p>
                    <p>Média de {mediaHorasPorDia} horas por dia no mês</p>
                </span>
            </Div>
        </Span>
    </>
}   

export default TempoMedioPermanencia