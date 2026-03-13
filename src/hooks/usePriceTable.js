import { useUser } from "../context/globalContext"
import { ReadPriceTable } from "../services/crud/priceTable"

const usePriceTable = () => {

    const { dataClient, setPriceTable } = useUser()

    const fetchPriceTable = async () => {
        const data  = await ReadPriceTable(dataClient?.id_establishment)

        setPriceTable(data[0])
    }

    return { fetchPriceTable }
}

export default usePriceTable