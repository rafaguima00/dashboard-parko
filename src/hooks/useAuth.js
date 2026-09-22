import { jwtDecode } from "jwt-decode"
import { useUser } from "../context/globalContext"
import { useNavigate } from "react-router-dom"
import { userAuthentication } from "../services/crud/auth"

const useAuth = () => {

    const navigate = useNavigate()

    const { setDataClient, setUnauthorized } = useUser()

    const authentication = async (dataUser) => {
        const data = await userAuthentication(dataUser)

        if (!data.token) {
            return {
                error: true,
                message: data,
                handle: () => {}
            }
        }

        const handleLogin = () => {
            localStorage.setItem("token", JSON.stringify(data))

            navigate("/start")
        }

        return {
            error: false,
            message: "",
            handle: handleLogin
        }
    }

    const generateToken = () => {
        const token = localStorage.getItem("token")

        if (token) {
            const decoded = jwtDecode(token)
            const user = decoded.user

            setDataClient(user)

            return
        } 
            
        setUnauthorized(true)
    }

    const removeToken = () => {
        alert("Você saiu da sua conta")
        localStorage.removeItem("token")

        return navigate("/")
    }

    return { authentication, generateToken, removeToken }
}

export default useAuth