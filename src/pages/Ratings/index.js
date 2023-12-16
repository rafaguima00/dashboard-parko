import {
    Container,
    Title
} from "./style";
import Rate from "./components/rate";

const Ratings = () => {

    return (
        <Container>
            <Title><strong>Avaliações</strong></Title>
            <Rate />
        </Container>
    )
}

export default Ratings;