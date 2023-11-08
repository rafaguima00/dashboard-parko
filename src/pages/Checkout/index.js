import {
    Container,
    List,
    Graphics
} from "./style";
import Buttons from "./components/buttons";
import FirstHeader from "./components/firstHeader";
import SecondHeader from "./components/secondHeader";
import SummaryContent from "./components/summaryContent";

const Checkout = () => {
    return (
        <Container>
            <FirstHeader />
            <SummaryContent />
            <SecondHeader />
            <List>List</List>
            <Buttons />
            <Graphics>Gráficos</Graphics>
        </Container>
    )
}

export default Checkout;