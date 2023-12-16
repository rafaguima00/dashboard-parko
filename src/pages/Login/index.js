import { Container, Image } from "./style";
import bgImage from "../../assets/bg-image-login.png";
import Welcome from "./components/welcome";
import Form from "./components/form";
import { theme } from "../../theme/theme";

const Login = () => {

    const { primaryColor } = theme;

    return (
        <Container>
            <Image backgroundImg={primaryColor} src={bgImage} />
            <Welcome />
            <Form />
        </Container>
    )
}   

export default Login;