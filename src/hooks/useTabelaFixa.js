import { useUser } from "../context/globalContext"
import { readTabelaFixa } from "../services/crud/tabelaFixa"

const useTabelaFixa = () => {

    const { dataClient, setTabelaFixa } = useUser()

    const fetchTabelaFixa = async () => {
        const data = await readTabelaFixa(dataClient?.id_establishment)

        setTabelaFixa(data)
    }

    return { fetchTabelaFixa }
}

export default useTabelaFixa