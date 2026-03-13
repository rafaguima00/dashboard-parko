import { useUser } from "../context/globalContext"
import { readRatings } from "../services/crud/ratings"

const useRatings = () => {

    const { dataClient, setRatings } = useUser()

    const fetchRatings = async () => {
        const data = await readRatings(dataClient?.id_establishment)

        setRatings(data)
    }

    return { fetchRatings }
}

export default useRatings