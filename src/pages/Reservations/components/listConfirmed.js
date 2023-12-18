import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/globalContext";
import {
    List,
    ListHeader,
    Text,
    ListBody,
    ElementList,
    ItemList
} from "../style";
import { confirmedReserve } from "../../../mocks/confirmadas";
import { formatCurrency } from "../../../services/formatCurrency";

const ListConfirmedReserve = () => {

    const [clicked, setClicked] = useState(0);

    const { setSelectedClient } = useContext(GlobalContext);

    const handleOnClick = ({ index, item }) => {
        setClicked(index)

        setSelectedClient({
            id: item.id,
            idClient: item.id_cliente,
            name: item.name,
            clock: item.clock,
            dateEntry: item.date_entry,
            dateExit: item.date_exit,
            vehicle: item.vehicle,
            licensePlate: item.license_plate,
            value: item.value,
            debt: item.debt
        })
    }

    return (
        <List>
            <ListHeader>
                <Text>Reserva</Text>
                <Text>Cliente</Text>
                <Text>Veículo</Text>
                <Text>Placa</Text>
                <Text>Entrada</Text>
                <Text>Valor</Text>
            </ListHeader>
            {
                confirmedReserve.map((item, index) => (
                    <ListBody key={item.id}>
                        <ElementList
                            backgroundcolor={clicked === index ? "#523499" : "#f4f4f4"}
                            textcolor={clicked === index ? "#fff" : "#7c7c7c"}
                            onClick={() => handleOnClick({ index, item })}
                        >
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{item.date_entry}</ItemList>
                            <ItemList>{formatCurrency(item.value, 'BRL')}</ItemList>
                        </ElementList>
                    </ListBody>
                ))
            }
        </List>
    )
}

export default ListConfirmedReserve;