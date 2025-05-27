import { useUser } from "../context/globalContext"
import { createAportes, readAportes } from "../services/crud/aportesService"

const useAportes = () => {

    const { setAportes } = useUser()

    const fetchAportes = async () => {
        try {
            const data = await readAportes()
            setAportes(data)
        } catch (error) {
            setAportes(`Erro ao buscar aportes ${error}`)
        }
    }

    const addAportes = async (aporte) => {
        try {
            const data = await createAportes(aporte)
            await fetchAportes()
            return data
        } catch (error) {
            setAportes(`Erro ao criar aporte ${error}`)
            throw error
        }
    }

    return { fetchAportes, addAportes }
}

export default useAportes