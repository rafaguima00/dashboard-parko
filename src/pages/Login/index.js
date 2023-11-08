import { Container, Image } from "./style"
import bgImage from "../../assets/bg-image-login.png"
import Welcome from "./components/welcome"
import Form from "./components/form"

const Login = () => {
    return (
        <Container>
            <Image src={bgImage} />
            <Welcome />
            <Form />
        </Container>
    )
}   

export default Login;