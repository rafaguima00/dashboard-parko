import { Div, Input, Label, Login, TextField } from "../style"
import { theme } from "../../../theme/theme"
import { useUser } from "../../../context/globalContext"

const NewPassword = (props) => {

    const { neutralColor, primaryColor } = theme
    const { setPage } = props
    const { dataClient, setDataClient } = useUser()

    const handleSave = e => {
        e.preventDefault()
    
        setPage(5)
    }

    return <>
        <Div textcolor={neutralColor}>
            <p>Qual a sua nova senha?</p>
            <Label>
                Altere sua senha abaixo, certifique-se de anotar,
                e deixar uma senha segura!
            </Label>
        </Div>
        <div>
            <TextField>
                <Label>Nova senha</Label>
                <Input
                    type="password"
                    placeholder="Digite sua nova senha"
                    required
                    onChange={e => setDataClient({ ...dataClient, password: e.target.value })}
                />
            </TextField>
            <TextField>
                <Label>Confirmar nova senha</Label>
                <Input
                    type="password"
                    placeholder="Confirme sua nova senha"
                    required
                    onChange={e => setDataClient({ ...dataClient, password: e.target.value })}
                />
            </TextField>
        </div>
        <Login
            btcolor={primaryColor}
            type="submit"
            onClick={handleSave}
        >
            Salvar
        </Login>
    </>
}

export default NewPassword