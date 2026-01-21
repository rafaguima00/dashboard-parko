import { Container, Image } from "./style"
import bgImage from "../../assets/bg-image-login.png"
import Welcome from "./components/welcome"
import { theme } from "../../theme/theme"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Login = () => {

    const { primaryColor } = theme
    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            return navigate("/start")
        }
    }, [navigate, token])

    return (
        <Container>
            <Image backgroundimg={primaryColor} src={bgImage} />
            <Welcome />
            <Outlet />
        </Container>
    )
}   

export default Login