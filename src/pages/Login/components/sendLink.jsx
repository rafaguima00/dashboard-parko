import { AreaForm, Login } from "../style"
import { useLocation, useNavigate } from "react-router-dom"
import TitleArea from "./titleArea"

const SendLink = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { message } = location?.state || {}

    const handleBack = e => {
        e.preventDefault()
        
        return navigate("/")
    }

    return <>
        <AreaForm>
            <TitleArea 
                title="Link de alteração de senha enviado!"
                message={message}
            />
            <Login type="submit" onClick={handleBack}>
                Voltar
            </Login>
        </AreaForm>
    </> 
}

export default SendLink