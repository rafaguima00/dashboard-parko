import { useState } from "react";
import { useUser } from "../../../context/globalContext";
import {
    List,
    ListHeader,
    Text,
    ListBody,
    ElementList,
    ItemList
} from "../style";
import { formatCurrency } from "../../../services/formatCurrency";

const ListConfirmedReserve = (props) => {

    const { reservaPendente } = props;

    const [clicked, setClicked] = useState(0);

    const { setSelectedClient } = useUser();

    const handleOnClick = ({ index, item }) => {
        setClicked(index)

        setSelectedClient({
            id: item.id,
            id_costumer: item.id_costumer,
            name: item.name,
            tel: item.tel,
            hora_entrada: item.hora_entrada,
            data_entrada: item.data_entrada,
            data_saida: item.data_saida,
            name_vehicle: item.name_vehicle,
            color: item.color,
            license_plate: item.license_plate,
            value: item.value
        })
    };

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
                reservaPendente.length === 0 ?
                <div>Nenhuma reserva aberta no momento</div> :
                reservaPendente.map((item, index) => (
                    <ListBody key={item.id}>
                        <ElementList
                            backgroundcolor={clicked === index ? "#523499" : "#f4f4f4"}
                            textcolor={clicked === index ? "#fff" : "#7c7c7c"}
                            onClick={() => handleOnClick({ index, item })}
                        >
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.name_vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{item.data_entrada}, {item.hora_entrada}</ItemList>
                            <ItemList>{formatCurrency(item.value, 'BRL')}</ItemList>
                        </ElementList>
                    </ListBody>
                ))
            }
        </List>
    )
}

export default ListConfirmedReserve;