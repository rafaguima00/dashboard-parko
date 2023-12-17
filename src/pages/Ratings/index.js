import {
    Container
} from "./style";
import Rate from "./components/rate";
import Top from "../../components/top/top";

const Ratings = () => {

    return (
        <Container>
            <Top children="Avaliações" fontsize={19} />
            <Rate />
        </Container>
    )
}

export default Ratings;