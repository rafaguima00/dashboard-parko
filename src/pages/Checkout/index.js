import {
    Container,
    Graphics
} from "./style";
import Buttons from "./components/buttons";
import FirstHeader from "./components/firstHeader";
import SecondHeader from "./components/secondHeader";
import SummaryContent from "./components/summaryContent";
import ListReserve from "./components/list";
import { theme } from "../../theme/theme";

const Checkout = () => {

    const { primaryColor } = theme;

    return (
        <Container>
            <FirstHeader />
            <SummaryContent />
            <SecondHeader />
            <ListReserve />
            <Buttons />
            <Graphics background={primaryColor}>
                <div>Resumo de vendas</div>
                <div>Reservas feitas pelo aplicativo da Parko</div>
            </Graphics>
        </Container>
    )
}

export default Checkout;