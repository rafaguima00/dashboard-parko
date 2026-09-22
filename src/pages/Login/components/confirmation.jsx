import { AreaForm, Login } from "../style"
import { useLocation, useNavigate } from "react-router-dom"
import TitleArea from "./titleArea"

const Confirmation = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { message } = location?.state || {}

    const handleBack = e => {
        e.preventDefault()
        
        return navigate("/")
    }

    return (
        <AreaForm>
            <TitleArea 
                title="Senha alterada com sucesso!"
                message={message}
            />
            <Login type="submit" onClick={handleBack}>
                Voltar ao início
            </Login>
        </AreaForm>
    )
}

export default Confirmation