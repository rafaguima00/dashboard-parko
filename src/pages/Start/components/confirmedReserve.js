import { confirmedReserve } from "../../../mocks/confirmadas"; 
import { 
    ListBody,
    ElementList,
    ItemList,
    State 
} from "../style";

const ConfirmedReserve = () => {
    return (
        <ListBody>
        {
            confirmedReserve.map(item => (
                <ElementList key={item.id}>
                    <input type="checkbox" />
                    <ItemList>{item.clock}</ItemList>
                    <ItemList>{item.vehicle}</ItemList>
                    <ItemList>{item.license_plate}</ItemList>
                    <State></State>
                </ElementList>
            ))
        }
        </ListBody>
    )
}

export default ConfirmedReserve;