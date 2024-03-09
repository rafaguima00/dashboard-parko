import { useContext } from "react";
import { GlobalContext } from "../../../context/globalContext";
import { 
    List,
    ListHeader,
    Text,
    ListBody,
    ElementList,
    ItemList
} from "../style";
import { formatCurrency } from "../../../services/formatCurrency";

const ListReserve = (props) => {

    const { reservaConfirmada } = props;
    const { dataClient } = useContext(GlobalContext);

    const firstWord = dataClient.colaborator.split(" ")[0];

    return (
        <List>
            <ListHeader>
                <Text>Reserva</Text>
                <Text>Cliente</Text>
                <Text>Veículo</Text>
                <Text>Placa</Text>
                <Text>Entrada</Text>
                <Text>Valor</Text>
                <Text>Caixa</Text>
            </ListHeader>
            {
                reservaConfirmada.map((item, index) => (
                    <ListBody key={index}>
                        <ElementList>
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.name_vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{item.data_entrada}, {item.hora_entrada}</ItemList>
                            <ItemList>{formatCurrency(item.value, 'BRL')}</ItemList>
                            <ItemList>{firstWord}</ItemList>
                        </ElementList>
                    </ListBody>
                ))
            }
        </List>
    )
}

export default ListReserve;