import { useUser } from "../context/globalContext"
import { readRetiradas, createRetiradas } from "../services/crud/retiradasService"

const useRetiradas = () => {

    const { setRetiradas } = useUser()

    const fetchRetiradas = async () => {
        try {
            const data = await readRetiradas()
            setRetiradas(data)
        } catch (error) {
            setRetiradas(`Erro ao buscar retiradas ${error}`)
        }
    }

    const addRetiradas = async (retirada) => {
        try {
            const data = await createRetiradas(retirada)
            fetchRetiradas()
            return data
        } catch (error) {
            throw error
        }
    }

    return { fetchRetiradas, addRetiradas }
}

export default useRetiradas