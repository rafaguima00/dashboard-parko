import { useUser } from "../context/globalContext"
import { readAberturaDoCaixa } from "../services/crud/aberturaDoCaixa"

const useAberturaDeCaixa = () => {

    const { dataClient, setCaixaAberto } = useUser()

    const fetchCaixa = async () => {
        const data = await readAberturaDoCaixa(dataClient.id_establishment)

        setCaixaAberto(data)
    }

    return { fetchCaixa }
}

export default useAberturaDeCaixa