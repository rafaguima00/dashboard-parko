import { useUser } from "../../../context/globalContext"
import { 
    FormContent,
    TextField,
    Label,
    Input, 
    Login,
    Div,
    Back,
    MessageError
} from "../style"
import { theme } from "../../../theme/theme"
import { FaArrowLeft } from "react-icons/fa6"
import { useState } from "react"

const ForgotPassword = (props) => {

    const { setDataClient, dataClient } = useUser()
    const { primaryColor, neutralColor } = theme
    const { setPage } = props

    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")

    const handleClick = e => {
        e.preventDefault()

        if(dataClient.email === "") {
            setError(true)
            setMessageError("Preencha o campo vazio")
            return
        }
        
        setDataClient({ ...dataClient, email: "" })
        setPage(3) 
    }

    const goBack = e => {
        e.preventDefault()

        setPage(1)
    }

    return <>
        <Div 
            textcolor={neutralColor}
        >
            <Back onClick={goBack}>
                <FaArrowLeft color={neutralColor} size={20} />
            </Back>
            <p>Esqueceu sua senha Parko?</p>
        </Div>
        <FormContent>
            <div>
                <TextField>
                    <Label>E-mail</Label>
                    <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        required
                        value={dataClient.email}
                        onChange={e => setDataClient({ ...dataClient, email: e.target.value })}
                    />
                </TextField>
            </div>
            { error &&
                <MessageError>{messageError}</MessageError>
            }
            <Login
                btcolor={primaryColor}
                type="submit"
                onClick={handleClick}
            >
                Avançar
            </Login>
        </FormContent>
    </>
}

export default ForgotPassword