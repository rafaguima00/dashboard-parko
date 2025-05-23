import {
    FormContent,
    TextField,
    Label,
    Input,
    MessageError,
    NewPassword,
    TextPassword,
    BtPassword,
    Login,
    AreaForm
} from "../style"
import { useState } from "react"
import { useUser } from "../../../context/globalContext"
import { useNavigate } from "react-router-dom"
import { theme } from "../../../theme/theme"
import api from "../../../services/api/server"
import { Dots } from "react-activity"
import "react-activity/dist/library.css"

const ContentForm = () => {

    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [title, setTitle] = useState("Login")

    const { setDataClient, dataClient } = useUser()
    const { primaryColor } = theme

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        if(dataClient.email === "" || dataClient.password === "") {
            setError(true)
            setMessageError("Preencha o campo vazio")
            return
        }

        setTitle(<Dots color={"#f4f4f4"} />)

        await api.post("/login", {
            email: dataClient.email,
            password: dataClient.password
        })
        .then(response => {    
            localStorage.setItem("token", JSON.stringify(response.data))
        })
        .then(() => {
            setTitle("Login")
            return navigate("/start")
        })
        .catch(e => {
            setTitle("Login")
            setError(true)
            setMessageError(e)
        })
    }

    const createPassword = e => {
        e.preventDefault()
        return navigate("/forgot-password")
    }

    return <>
        <AreaForm onSubmit={handleLogin}>
            <div>
                <TextField>
                    <Label>E-mail</Label>
                    <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        required
                        onChange={e => setDataClient({ ...dataClient, email: e.target.value })}
                    />
                </TextField>
                <TextField>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        placeholder="Digite sua senha"
                        required
                        onChange={e => setDataClient({ ...dataClient, password: e.target.value })}
                    />
                </TextField>
            </div>
            { error &&
                <MessageError>{messageError}</MessageError>
            }
            <NewPassword>
                <TextPassword textcolor={primaryColor}>Esqueceu a senha?</TextPassword>
                <BtPassword onClick={e => createPassword(e)}>Crie uma nova</BtPassword>
            </NewPassword>
            <Login 
                btcolor={primaryColor} 
                type="submit" 
                onClick={e => handleLogin(e)}
            >
                {title}
            </Login>
        </AreaForm>
    </>
}

export default ContentForm