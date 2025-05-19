import React, { useEffect, useState } from "react"
import InformacoesReserva from "./informacoesReserva"
import { Edit } from "../style"
import Modal from "../../../components/Modal"
import EditModal from "../form/edit"
import { useUser } from "../../../context/globalContext"
import api from "../../../services/api/server"

const FirstColumn = (props) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(0)

    const { dateTime, setDateTime, valorDaReservaAtual, listReservations } = props.states

    const { selectedClient, setSelectedClient } = useUser()

    const handleUpdate = async (id, e) => {
        e.preventDefault()
        setLoading(true)

        const converter = dateTime.split("T")

        await api.put(`reservations/${id}`, {
            data_entrada: selectedClient.data_entrada,
            hora_entrada: selectedClient.hora_entrada,
            data_saida: converter[0],
            hora_saida: converter[1],
            value: valorDaReservaAtual,
            status: status,
            id_vehicle: selectedClient.id_vehicle
        })
        .then(() => {
            alert("Reserva atualizada com sucesso.")
            setSelectedClient({ 
                ...selectedClient, 
                data_saida: converter[0], 
                hora_saida: converter[1] 
            })
            listReservations()
            setDateTime("")
            setOpenEdit(false)
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if(dateTime) console.log(dateTime)
    }, [dateTime])

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
                funcao={e => handleUpdate(selectedClient.id, e)} 
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