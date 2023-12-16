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
            <Title gridColumn={1} gridRow={1}>
                <strong>Meu</strong> estabelecimento
            </Title>
            <Establishment />
            <Title gridColumn={"span 2"} gridRow={1}>
                <strong>Horário</strong> de funcionamento
            </Title>
            <OpeningHours />
            <Title gridColumn={2} gridRow={3}>
                <strong>Nossos</strong> colaboradores
            </Title>
            <Colaborators />
            <Title gridColumn={3} gridRow={3}>
                <strong>Tabela</strong> de preço
            </Title>
            <PriceTable />
        </Container>
    )
}

export default Settings;