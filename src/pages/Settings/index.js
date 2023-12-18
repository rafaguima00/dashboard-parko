import { 
    Container,
    Title
} from "./style";
import Establishment from "./components/establishment";
import Colaborators from "./components/colaborators";
import PriceTable from "./components/priceTable";
import OpeningHours from "./components/openingHours";

const Settings = () => {
    return (
        <Container>
            <Title gridcolumn={1} gridrow={1}>
                <strong>Meu</strong> estabelecimento
            </Title>
            <Establishment />
            <Title gridcolumn={"span 2"} gridrow={1}>
                <strong>Horário</strong> de funcionamento
            </Title>
            <OpeningHours />
            <Title gridcolumn={2} gridrow={3}>
                <strong>Nossos</strong> colaboradores
            </Title>
            <Colaborators />
            <Title gridcolumn={3} gridrow={3}>
                <strong>Tabela</strong> de preço
            </Title>
            <PriceTable />
        </Container>
    )
}

export default Settings;