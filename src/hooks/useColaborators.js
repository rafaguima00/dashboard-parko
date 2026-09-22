import { useNavigate } from "react-router-dom"
import { useUser } from "../context/globalContext"
import { createEmailVerification, readColaborators } from "../services/crud/colaborators"

const useColaborators = () => {

    const navigate = useNavigate()

    const { dataClient, setColaborators } = useUser()

    const fetchColaborators = async () => {
        const data = await readColaborators(dataClient?.id_establishment)

        setColaborators(data)
    }

    const verifyEmail = async (email, setEmail) => {
        const response = await createEmailVerification(email)

        const onConfirmed = () => {
            setEmail("")
            return navigate("/send-link", {
                state: {
                    message: response.data.message
                }
            })
        }

        if (response?.status !== 200) {
            return {
                error: true,
                message: response.message,
                handle: () => {}
            }
        }

        return {
            error: false,
            message: response.data.message,
            handle: onConfirmed
        }
    }

    return { fetchColaborators, verifyEmail }
}

export default useColaborators