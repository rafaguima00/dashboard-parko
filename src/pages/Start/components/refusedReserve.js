import { refusedReserve } from "../../../mocks/recusadas";
import { 
    ListBody,
    ElementList,
    InputPin,
    ItemList,
    State 
} from "../style";

const RefusedReserve = () => {
    return (
        <ListBody>
        {
            refusedReserve.map(item => (
                <ElementList key={item.id}>
                    <InputPin type="number" placeholder="PIN" />
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

export default RefusedReserve;