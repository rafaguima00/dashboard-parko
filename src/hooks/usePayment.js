import { useUser } from "../context/globalContext"
import { readPayments } from "../services/crud/paymentService"

const usePayment = () => {

    const { dataClient, setResumoVendas } = useUser()

    const fetchPayments = async () => {
        const data = await readPayments(dataClient.id_establishment)
        setResumoVendas(data)
    }

    return { fetchPayments }
}

export default usePayment