import GeralDeContas from "./geralDeContas"

const ReportCosts = (props) => {

    const { filterAcc, tabelaDeContas } = props

    return <>
        {tabelaDeContas === "geral_de_contas" &&
            <GeralDeContas filterAcc={filterAcc} /> // A tabela de contas pagas e pendentes é a mesma das outras 2
        }

        {tabelaDeContas === "segregacao" &&
            <GeralDeContas filterAcc={filterAcc} /> 
        }

        {tabelaDeContas === "custos_por_categoria" &&
            <GeralDeContas filterAcc={filterAcc} />
        }
    </>
}

export default ReportCosts