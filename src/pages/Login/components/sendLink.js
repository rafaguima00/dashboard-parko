import { AreaForm, Div, Label, Login } from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"

const SendLink = () => {

    const { neutralColor, primaryColor } = theme
    const navigate = useNavigate()

    const handleBack = e => {
        e.preventDefault()
        return navigate("/")
    }

    return <AreaForm>
        <Div textcolor={neutralColor}>
            <p>Link de alteração de senha enviado!</p>
            <Label>
                Enviamos o link de alteração para o seu e-mail,
                verifique sua caixa de entrada!
            </Label>
        </Div>
        <Login
            btcolor={primaryColor}
            type="submit"
            onClick={handleBack}
        >
            Voltar
        </Login>
    </AreaForm>
}

export default SendLink