import { motion } from "framer-motion"
import { DataName } from "../style"
import { theme } from "../../../theme/theme"
import GlobalButton from "../../../components/Button"
import { horarioDeSaida } from "../utils/horarioDeSaida"
import useReservation from "../../../hooks/useReservation"
import { updateRequestEndReservation } from "../../../services/crud/requestEndReservation"

const Request = (props) => {

    const { setShowNotification, showNotification, requests } = props
    const { cancelColor, greenColor } = theme

    const { editReservation } = useReservation()

    const updateReservation = async (item, status) => {

        const handleUpdate = () => {
            updateRequestEndReservation(item)
            setShowNotification(false)
        }

        await editReservation(
            item.id_reservation, 
            {
                data_entrada: item.data_entrada,
                hora_entrada: item.hora_entrada,
                data_saida: item.data_saida,
                hora_saida: item.hora_saida,
                value: item.value,
                status: status, 
                id_vehicle: item.id_vehicle,
                id_establishment: item.id_establishment
            },
            handleUpdate   
        )
    }

    return <>
        {(showNotification && requests.length > 0) &&
            requests.map(item => (
                <motion.div
                    className="notification-card"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <DataName>
                        <strong>{item.name}</strong> Acabou de finalizar a reserva
                    </DataName>
                    <DataName>
                        <strong>Carro:</strong> {item.name_vehicle} <strong>Placa:</strong> {item.license_plate}
                    </DataName>
                    <DataName>
                        <strong>Horário de saída:</strong> {horarioDeSaida(item.created_at)}
                    </DataName>
                    
                    <div className="notification-buttons">
                        <GlobalButton
                            children={"Discordar"}
                            background={cancelColor}
                            largura={"126px"}
                            altura={"36px"}
                            aoPressionar={() => updateReservation(item, 3)}
                        />
                        <GlobalButton
                            children={"Concordar"}
                            background={greenColor}
                            largura={"126px"}
                            altura={"36px"}
                            aoPressionar={() => updateReservation(item, 4)}
                        />
                    </div>
                </motion.div>
            ))
        }
    </>
}

export default Request