import { useUser } from "../context/globalContext"
import { readPark } from "../services/crud/parkService"

const usePark = () => {

    const { dataClient, setPark } = useUser()

    const fetchPark = async () => {
        const data = await readPark(dataClient?.id_establishment)

        setPark(data[0])
    }

    return { fetchPark }
}

export default usePark