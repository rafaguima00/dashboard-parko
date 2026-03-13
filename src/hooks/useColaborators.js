import { useUser } from "../context/globalContext"
import { readColaborators } from "../services/crud/colaborators"

const useColaborators = () => {

    const { dataClient, setColaborators } = useUser()

    const fetchColaborators = async () => {
        const data = await readColaborators(dataClient?.id_establishment)

        setColaborators(data)
    }

    return { fetchColaborators }
}

export default useColaborators