import { Container, Login, Text } from "./style"
import { unknownError } from "../../mocks/errorPage"
import { theme } from "../../theme/theme"

const ErrorPage = ({ errorMsg }) => {

    const token = localStorage.getItem("token")

    const { primaryColor } = theme

    function navigateToLogin(e) {
        e.preventDefault()
        window.location.href = "/"
    }

    return (
        <Container>
            <Text>{errorMsg || unknownError}</Text>
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