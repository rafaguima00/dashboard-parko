import { Div, Label, Login } from "../style"
import { theme } from "../../../theme/theme"

const SendLink = (props) => {

    const { neutralColor, primaryColor } = theme
    const { setPage } = props

    const handleBack = e => {
        e.preventDefault()
    
        setPage(1)
    }

    return <>
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
    </>
}

export default SendLink