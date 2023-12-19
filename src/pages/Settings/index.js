import { 
    Container,
    Title
} from "./style";
import Establishment from "./components/establishment";
import Colaborators from "./components/colaborators";
import PriceTable from "./components/priceTable";
import OpeningHours from "./components/openingHours";
import { theme } from "../../theme/theme";

const Settings = () => {

    const { neutralColor } = theme;
    
    return (
        <Container>
            <Title gridcolumn={1} gridrow={1} textcolor={neutralColor}>
                <strong>Meu</strong> estabelecimento
            </Title>
            <Establishment />
            <Title gridcolumn={"span 2"} gridrow={1} textcolor={neutralColor}>
                <strong>Horário</strong> de funcionamento
            </Title>
            <OpeningHours />
            <Title gridcolumn={2} gridrow={3} textcolor={neutralColor}>
                <strong>Nossos</strong> colaboradores
            </Title>
            <Colaborators />
            <Title gridcolumn={3} gridrow={3} textcolor={neutralColor}>
                <strong>Tabela</strong> de preço
            </Title>
            <PriceTable />
        </Container>
    )
}

export default Settings;