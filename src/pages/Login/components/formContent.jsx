import {
    MessageError,
    NewPassword,
    TextPassword,
    BtPassword,
    Login,
    AreaForm
} from "../style"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dots } from "react-activity"
import "react-activity/dist/library.css"
import Inputs from "./inputs"
import useAuth from "../../../hooks/useAuth"

const ContentForm = () => {

    const { authentication } = useAuth()

    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [title, setTitle] = useState("Login")
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleLogin = async e => {
        e.preventDefault()

        setTitle(<Dots color={"#f4f4f4"} />)

        const { email, password } = data

        const auth = await authentication({ email, password })

        if (auth.error) {
            setError(auth.error)
            setMessageError(auth.message)
            setTitle("Login")

            return
        }

        auth.handle()
    }

    const createPassword = e => {
        e.preventDefault()
        return navigate("/forgot-password")
    }

    return <>
        <AreaForm onSubmit={handleLogin}>
            <Inputs data={data} setData={setData} />
            {error &&
                <MessageError>{messageError}</MessageError>
            }
            <NewPassword>
                <TextPassword>Esqueceu a senha?</TextPassword>
                <BtPassword onClick={createPassword}>Crie uma nova</BtPassword>
            </NewPassword>
            <Login type="submit" onClick={handleLogin}>
                {title}
            </Login>
        </AreaForm>
    </>
}

export default ContentForm