import {
    ReserveStatus,
    TextReservations,
    DivReservations,
    BtReservations,
    ListHeader,
    Text,
    TextState
} from "../style"
import { RxInfoCircled } from "react-icons/rx"
import PendingReserve from "./pendingReserve"
import ConfirmedReserve from "./confirmedReserve"
import RefusedReserve from "./refusedReserve"
import Top from "../../../components/Top"
import { theme } from "../../../theme/theme"
import LoadingScreen from "../../../components/Loading"
import { useState } from "react"

const ReservationStatus = (props) => {

    const { btReservations, selected, setSelected } = props
    const { primaryColor } = theme

    const [open, setOpen] = useState(false)
    const [openRefuse, setOpenRefuse] = useState(false)
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("#c4c4c4")

    function mouseEnter() {
        setColor("red")
    }

    function mouseLeave() {
        setColor("#c4c4c4")
    }

    return <>
        <ReserveStatus>
            <TextReservations>
                <Top children={"Reservas Clientes Parko"} font={17} />
                <div
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                >
                    <RxInfoCircled color={color} size={22} />
                </div>
            </TextReservations>
            <DivReservations>
                {
                    btReservations.map(item => (
                        <BtReservations
                            textcolor={
                                selected === item.id ? primaryColor : "#c4c4c4"
                            }
                            borderbottom={
                                selected === item.id ? primaryColor : "transparent"
                            }
                            key={item.id}
                            onClick={() => setSelected(item.id)}
                        >
                            {item.name}
                        </BtReservations>
                    ))
                }
            </DivReservations>
            <div>
                <ListHeader>
                    <Text>Confirmar</Text>
                    <Text>Horário</Text>
                    <Text>Veículo</Text>
                    <Text>Placa</Text>
                    <TextState>Legenda</TextState>
                </ListHeader>

                {selected === 1 && 
                    <PendingReserve 
                        states={{ 
                            setOpen, 
                            open,
                            setLoading
                        }}
                    />
                }

                {selected === 2 && 
                    <ConfirmedReserve 
                        states={{ 
                            setLoading, 
                            setOpenRefuse,
                            openRefuse,
                            loading 
                        }}
                    />
                }

                {selected === 3 && <RefusedReserve />}
            </div>
        </ReserveStatus>
        <LoadingScreen isOpen={loading} />
    </>
}

export default ReservationStatus