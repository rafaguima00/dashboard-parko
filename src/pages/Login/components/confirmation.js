import { Div, Label, Login } from "../style"
import { theme } from "../../../theme/theme"

const Confirmation = (props) => {

    const { neutralColor, primaryColor } = theme
    const { setPage } = props

    const handleBack = e => {
        e.preventDefault()
    
        setPage(1)
    }

    return <>
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
    </>
}

export default Confirmation