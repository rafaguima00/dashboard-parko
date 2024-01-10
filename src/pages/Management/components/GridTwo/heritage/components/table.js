import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { GroupButton } from "../../../../style";
import { 
    ElementList, 
    List, 
    ListBody, 
    ListHeader, 
    Text
} from "../style";
import { heritage } from "../../../../../../mocks/patrimonio";

const TableAccount = (props) => {

    const { neutralColor, setEditItem, setChosenItem } = props;

    const returnData = ({ item }) => {
        setChosenItem({
            id: item.id,
            code: item.code,
            item:  item.item,
            category: item.category,
            quantity: item.quantity
        })
        setEditItem(true)
    }

    return (
        <List>
            <ListHeader>
                <Text textcolor="#bababa">Código</Text>
                <Text textcolor="#bababa">Categoria</Text>
                <Text textcolor="#bababa">Quantidade</Text>
                <Text textcolor="#bababa">Item</Text>
                <Text textcolor="#bababa">Ação</Text>
            </ListHeader>
            <ListBody>
                {heritage.map(item => (
                    <ElementList key={item.id}>
                        <Text textcolor="#7c7c7c">{item.code}</Text>
                        <Text textcolor="#7c7c7c">{item.category}</Text>
                        <Text textcolor="#7c7c7c">{item.quantity}</Text>
                        <Text textcolor="#7c7c7c">{item.name}</Text>
                        <GroupButton marginright={".5rem"} largura={"100%"} background="#fff">
                            <button onClick={() => returnData({item})}>
                                <FiEdit color={neutralColor} size={19}/>
                            </button>
                            <button>
                                <AiOutlineDelete color={neutralColor} size={19}/>
                            </button>
                        </GroupButton> 
                    </ElementList>
                ))}
            </ListBody>
        </List>
    )
}

export default TableAccount;