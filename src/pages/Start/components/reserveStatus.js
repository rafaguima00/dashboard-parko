import {
    ReserveStatus,
    TextReservations,
    DivReservations,
    BtReservations,
    ListHeader,
    Text,
    TextState
} from "../style";
import { RxInfoCircled } from "react-icons/rx";
import PendingReserve from "./pendingReserve";
import ConfirmedReserve from "./confirmedReserve";
import RefusedReserve from "./refusedReserve";
import Top from "../../../components/top";

const ReservationStatus = (props) => {

    const { btReservations, selected, setSelected } = props;

    return (
        <ReserveStatus>
            <TextReservations>
                <Top children={"Reservas Clientes Parko"} font={17} />
                <RxInfoCircled color="#c4c4c4" size={22} />
            </TextReservations>
            <DivReservations>
                {
                    btReservations.map(item => (
                        <BtReservations
                            textcolor={selected === item.id ? "#D64D4D" : "#c4c4c4"}
                            borderbottom={selected === item.id ? "#D64D4D" : "transparent"}
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
                {selected === 1 && <PendingReserve />}
                {selected === 2 && <ConfirmedReserve />}
                {selected === 3 && <RefusedReserve />}
            </div>
        </ReserveStatus>
    )
}

export default ReservationStatus;