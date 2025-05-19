import { Container, Login, Text } from "./style"
import { unknownError } from "../../mocks/errorPage"
import { useRouteError } from "react-router-dom"
import { theme } from "../../theme/theme"

const ErrorPage = () => {

    const errorMessage = useRouteError()
    const token = localStorage.getItem("token")

    const { primaryColor } = theme

    function navigateToLogin(e) {
        e.preventDefault()
        window.location.href = "/"
    }

    return (
        <Container>
            <Text>{errorMessage || unknownError}</Text>
            {!token && 
                <Login
                    btcolor={primaryColor}
                    type="submit"
                    onClick={e => navigateToLogin(e)}
                >
                    Página de Login
                </Login>
            }
        </Container>
    )
}

export default ErrorPage