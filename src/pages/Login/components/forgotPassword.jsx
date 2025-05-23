import { useUser } from "../../../context/globalContext"
import { 
    FormContent,
    TextField,
    Label,
    Input, 
    Login,
    Div,
    Back,
    MessageError,
    AreaForm
} from "../style"
import { theme } from "../../../theme/theme"
import { FaArrowLeft } from "react-icons/fa6"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../services/api/server"
import { Dots } from "react-activity"
import "react-activity/dist/library.css"

const ForgotPassword = () => {

    const { setDataClient, dataClient } = useUser()
    const { primaryColor, neutralColor } = theme

    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [title, setTitle] = useState("Avançar")

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        setTitle(<Dots color={"#f4f4f4"} />)

        await api.post("/verify-email", {
            email: dataClient.email
        })
        .then(() => {
            setTitle("Avançar")
            setDataClient({ ...dataClient, email: "" })
            return navigate("/send-link")
        })
        .catch(e => {
            setTitle("Avançar")
            setError(true)
            setMessageError(e.response.data.message)
        })
    }

    const goBack = e => {
        e.preventDefault()
        return navigate("/")
    }

    return <AreaForm>
        <Div textcolor={neutralColor}>
            <Back onClick={goBack}>
                <FaArrowLeft color={neutralColor} size={20} />
            </Back>
            <p>Esqueceu sua senha Parko?</p>
        </Div>
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
            {title}
        </Login>
    </AreaForm>
}

export default ForgotPassword