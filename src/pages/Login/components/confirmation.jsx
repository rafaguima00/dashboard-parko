import { AreaForm, Div, Label, Login } from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"

const Confirmation = () => {

    const { neutralColor, primaryColor } = theme
    const navigate = useNavigate()

    const handleBack = e => {
        e.preventDefault()
        return navigate("/")
    }

    return <AreaForm>
        <Div textcolor={neutralColor}>
            <p>Senha alterada com sucesso!</p>
            <Label>
                Sua senha foi alterada com sucesso.
            </Label>
        </Div>
        <Login
            btcolor={primaryColor}
            type="submit"
            onClick={handleBack}
        >
            Voltar ao início
        </Login>
    </AreaForm>
}

export default Confirmation