import { useState } from "react"
import InformacoesReserva from "./informacoesReserva"
import { Edit } from "../style"
import Modal from "../../../components/Modal"
import EditModal from "../form/edit"
import { useUser } from "../../../context/globalContext"
import { updateReservation } from "../utils/updateReservation"

const FirstColumn = (props) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(0)

    const { dateTime, setDateTime, listReservations } = props.states
    const { selectedClient, setSelectedClient, priceTable } = useUser()
    const { handleUpdate } = updateReservation({ 
        selectedClient, 
        setSelectedClient, 
        setLoading, 
        priceTable,
        setDateTime,
        setOpenEdit
    })

    return <>
        <section>
            {/* Informações da reserva feita */}
            <InformacoesReserva selectedClient={selectedClient} />

            {/* Editar hora de saída da reserva */}
            <Edit onClick={() => setOpenEdit(true)}>Editar</Edit>
            <Modal
                isOpen={openEdit}
                setOpen={setOpenEdit}
                title={selectedClient ? `Nº ${selectedClient.id}` : ""}
                maxWidth={"52rem"}
                funcao={e => handleUpdate(selectedClient.id, e, listReservations, status, dateTime)} 
                isLoading={loading}
            >
                <EditModal 
                    states={{ 
                        selectedClient,
                        setSelectedClient,
                        setStatus,
                        dateTime,
                        setDateTime
                    }} 
                />
            </Modal>
        </section>
    </>
}

export default FirstColumn