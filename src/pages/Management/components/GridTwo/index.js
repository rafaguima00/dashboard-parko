import FinancialReport from "./financialReport/financialReport";
import Accounts from "./accounts/accounts";
import Heritage from "./heritage/heritage";
import Occurrence from "./occurrence/occurrence";
import { Financial } from "../../style";
import Top from "../../../../components/top/top";

const GridTwo = (props) => {

    const { selected, bqSelected } = props.states;

    const titleSelected = () => {
        if(selected === 0) {
            return "Relatórios Financeiros"
        } else if (selected === 1) {
            return "Registros de Contas"
        } else if (selected === 2) {
            return "Registro de Patrimônio"
        } else {
            return "Registro de Ocorrências"
        }
    }

    const title = titleSelected();
    
    return (
        <>
            <Top children={title} font={19} gridcolumn={2} gridrow={1}/>
            {selected === 3 && <Top children={"Formulário de Ocorrências"} font={19} gridcolumn={3} gridrow={1}/>}
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