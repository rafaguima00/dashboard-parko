import { pendingReserve } from "../../../mocks/pendentes";
import { 
    ListBody,
    ElementList,
    ItemList,
    State 
} from "../style";

const PendingReserve = () => {
    return (
        <ListBody>
        {
            pendingReserve.map(item => (
                <ElementList key={item.id}>
                    <input type="checkbox" />
                    <ItemList>{item.clock}</ItemList>
                    <ItemList>{item.vehicle}</ItemList>
                    <ItemList>{item.lisencePlate}</ItemList>
                    <State></State>
                </ElementList>
            ))
        }
        </ListBody>
    )
}

export default PendingReserve;