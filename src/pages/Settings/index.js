import { Container } from "./style";
import Establishment from "./components/establishment";
import Colaborators from "./components/colaborators";
import PriceTable from "./components/priceTable";
import OpeningHours from "./components/openingHours";
import Top from "../../components/top/top";

const Settings = () => {
    
    return (
        <Container>
            <Top children="Meu estabelecimento" gridcolumn={1} gridrow={1} font={19}/>
            <Establishment />
            <Top children="Horário de funcionamento" gridcolumn={"span 2"} gridrow={1} font={19}/>
            <OpeningHours />
            <Top children="Nossos colaboradores" gridcolumn={2} gridrow={3} font={19}/>
            <Colaborators />
            <Top children="Tabela de preço" gridcolumn={3} gridrow={3} font={19}/>
            <PriceTable />
        </Container>
    )
}

export default Settings;