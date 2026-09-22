import { AreaForm, Div, Label, Login, MessageError } from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import TextInput from "../../../components/Input"
import TitleArea from "./titleArea"

const NewPassword = () => {
    
    const navigate = useNavigate()

    const { neutralColor } = theme

    const cinzaClaro = "#7D7D7D"

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState(false)
    const [messageError, setMessageError] = useState("")

    const handleSave = e => {
        e.preventDefault()

        if (!form.password || !form.confirmPassword) {
            setError(true)
            setMessageError("Preencha o campo vazio")

            return
        }

        if (form.password !== form.confirmPassword) {
            setError(true)
            setMessageError("As senhas não conferem")

            return
        }

        return navigate("/confirmation", {
            state: {
                message: "Sua senha foi alterada com sucesso."
            }
        })
    }

    return <>
        <AreaForm>
            <TitleArea 
                title={"Qual a sua nova senha?"}
                message={
                    "Altere sua senha abaixo, certifique-se de anotar e deixar uma senha segura!"
                }
            />
            <TextInput 
                label="Nova senha"
                type="password"
                placeholder="Digite sua nova senha"
                value={form.password}
                setValue={e => {
                    setForm({ ...form, password: e.target.value })
                }}
                width={288}
                textColor={cinzaClaro}
                borderColor={cinzaClaro}
                borderWidth={2}
            />
            <TextInput 
                label="Confirmar nova senha"
                type="password"
                placeholder="Confirme sua nova senha"
                value={form.confirmPassword}
                setValue={e => {
                    setForm({ ...form, confirmPassword: e.target.value })
                }}
                width={288}
                textColor={cinzaClaro}
                borderColor={cinzaClaro}
                borderWidth={2}
                margin={"1rem 0"}
            />
            {error &&
                <MessageError>{messageError}</MessageError>
            }
            <Login type="submit" onClick={handleSave}>
                Salvar
            </Login>
        </AreaForm>
    </>
}

export default NewPassword