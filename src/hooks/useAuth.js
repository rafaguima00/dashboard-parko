import { jwtDecode } from "jwt-decode"
import { useUser } from "../context/globalContext"
import { useNavigate } from "react-router-dom"

const useAuth = () => {

    const navigate = useNavigate()

    const { setDataClient, setUnauthorized } = useUser()

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

    return { generateToken, removeToken }
}

export default useAuth