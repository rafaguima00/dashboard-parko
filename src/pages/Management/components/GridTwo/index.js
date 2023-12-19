import FinancialReport from "./financialReport/financialReport";
import Accounts from "./accounts/accounts";
import Heritage from "./heritage/heritage";
import Occurrence from "./occurrence/occurrence";
import { Title, Financial } from "../../style";

const GridTwo = (props) => {

    const { selected, bqSelected } = props.states;

    return (
        <>
            <Title gridcolumn={"span 2"} gridrow={1}>
                { selected === 0 && "Relatórios Financeiros"}
                { selected === 1 && "Registros de Contas"}
                { selected === 2 && "Registro de Patrimônio"}
                { selected === 3 && "Registro de Ocorrências"}
            </Title>
            <Financial gridcolumn={"span 2"} gridrow={"span 2"}>
                { selected === 0 && <FinancialReport bqSelected={bqSelected} /> }
                { selected === 1 && <Accounts/> }
                { selected === 2 && <Heritage/> }
                { selected === 3 && <Occurrence/> }
            </Financial>
        </>
        
    )
}

export default GridTwo;