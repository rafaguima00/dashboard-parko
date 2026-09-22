import { Login, MessageError, AreaForm } from "../style"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dots } from "react-activity"
import "react-activity/dist/library.css"
import useColaborators from "../../../hooks/useColaborators"
import TextInput from "../../../components/Input"
import TitleArea from "./titleArea"

const ForgotPassword = () => {

    const navigate = useNavigate()

    const { verifyEmail } = useColaborators()

    const cinzaClaro = "#7D7D7D"

    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [title, setTitle] = useState("Avançar")
    const [email, setEmail] = useState("")

    const handleClick = async (e) => {
        e.preventDefault()

        setTitle(<Dots color={"#f4f4f4"} />)

        const verify = await verifyEmail({ email }, setEmail)

        if (verify.error) {
            setError(verify.error)
            setMessageError(verify.message)
            setTitle("Avançar")

            return
        }

        verify.handle()
    }

    const goBack = e => {
        e.preventDefault()

        return navigate("/")
    }

    return <>
        <AreaForm>
            <TitleArea 
                arrow
                title="Esqueceu sua senha Parko?"
                onClick={goBack}
            />
            <TextInput 
                label="E-mail"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                setValue={e => setEmail(e.target.value)}
                width={288}
                textColor={cinzaClaro}
                borderColor={cinzaClaro}
                borderWidth={2}
                margin={"0 0 1rem"}
            />
            {error &&
                <MessageError>{messageError}</MessageError>
            }
            <Login type="submit" onClick={handleClick}>
                {title}
            </Login>
        </AreaForm>
    </>
}

export default ForgotPassword