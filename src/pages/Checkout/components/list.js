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

const ListReserve = () => {
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
                confirmedReserve.map((item, index) => (
                    <ListBody key={index}>
                        <ElementList>
                            <ItemList>{item.id}</ItemList>
                            <ItemList>{item.name}</ItemList>
                            <ItemList>{item.vehicle}</ItemList>
                            <ItemList>{item.license_plate}</ItemList>
                            <ItemList>{item.date_entry}</ItemList>
                            <ItemList>{formatCurrency(item.value, 'BRL')}</ItemList>
                            <ItemList>Rafael</ItemList>
                        </ElementList>
                    </ListBody>
                ))
            }
        </List>
    )
}

export default ListReserve;