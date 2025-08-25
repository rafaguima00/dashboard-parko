import { useEffect, useState } from "react"
import InformacoesReserva from "./informacoesReserva"
import { Edit } from "../style"
import Modal from "../../../components/Modal"
import EditModal from "../form/edit"
import { useUser } from "../../../context/globalContext"
import useReservation from "../../../hooks/useReservation"
import { calculateReservationValue } from "../../../utils/CalculateReservationValue"

const FirstColumn = (props) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(0)
    const [formData, setFormData] = useState({})

    const { dateTime, setDateTime } = props.states
    const { selectedClient, setSelectedClient, priceTable, tabelaFixa } = useUser()
    const { editReservation } = useReservation()

    function formatarDataHoraParaDate(data_entrada) {
        let dataStr = data_entrada

        if (!dataStr) return null
    
        // Detectar se o formato é dd/mm/yyyy
        if (dataStr.includes('/')) {
            const partes = dataStr.split('/')
            if (partes.length !== 3) return null
    
            const [dia, mes, ano] = partes
            dataStr = `${ano}-${mes}-${dia}`

            setFormData({ hora_entrada: selectedClient?.hora_entrada, data_entrada: dataStr })
        }
    }

    const updateForm = (e, id) => {
        e.preventDefault()
        setLoading(true)

        const converter = dateTime.split("T")

        const updatedClient = {
            ...selectedClient,
            data_entrada: formData.data_entrada,
            hora_entrada: formData.hora_entrada,
            data_saida: converter[0],
            hora_saida: converter[1],
            status: status
        }

        setSelectedClient(updatedClient)
        handleUpdate(id, updatedClient)
    }

    const handleUpdate = async (id, updatedClient) => {
        
        const { valorDaReservaAtual } = calculateReservationValue(updatedClient, priceTable, tabelaFixa, selectedClient.type_of_charge)

        try {
            await editReservation(id, {
                data_entrada: updatedClient?.data_entrada,
                hora_entrada: updatedClient?.hora_entrada,
                data_saida: updatedClient?.data_saida || "",
                hora_saida: updatedClient?.hora_saida || "",
                value: valorDaReservaAtual,
                status: status,
                id_vehicle: updatedClient?.id_vehicle
            })

            alert("Reserva atualizada com sucesso.")
            setDateTime("")
            setOpenEdit(false)
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (selectedClient) {
            formatarDataHoraParaDate(selectedClient?.data_entrada)
        }
    }, [selectedClient])

    return <>
        <section>
            {/* Informações da reserva feita */}
            <InformacoesReserva />

            {/* Editar hora de saída da reserva */}
            <Edit onClick={() => setOpenEdit(true)}>Editar</Edit>
            <Modal
                isOpen={openEdit}
                setOpen={setOpenEdit}
                title={selectedClient ? `Nº ${selectedClient.id}` : ""}
                maxWidth={"52rem"}
                funcao={e => updateForm(e, selectedClient.id)} 
                isLoading={loading}
            >
                <EditModal 
                    states={{ 
                        setStatus, status,
                        dateTime, setDateTime,
                        formData, setFormData
                    }} 
                />
            </Modal>
        </section>
    </>
}

export default FirstColumn