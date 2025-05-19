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
import api from "../../../../../../services/api/server";
import EmptyMessage from "../../../../../../components/EmptyMessage";

const TableAccount = (props) => {

    const { neutralColor, setEditItem, setChosenItem, filtrarPatrimonio } = props;

    const returnData = ({ item }) => {
        setChosenItem({
            id: item.id,
            code: item.code,
            name: item.name,
            category: item.category,
            date_registry: item.date_registry,
            quantity: item.quantity,
            unit_measurement: item.unit_measurement,
            value: item.value,
            id_establishment: item.id_establishment
        })
        setEditItem(true)
    };

    const handleDeleteItem = async (id) => {
        await api.delete(`/heritage/${id}`)
        .then(() => alert("Item excluído da lista"))
        .catch(e => console.log(e))
    };

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
                {
                    filtrarPatrimonio.length > 0 ?
                    filtrarPatrimonio.map(item => (
                        <ElementList key={item.id}>
                            <Text textcolor="#7c7c7c">{item.code}</Text>
                            <Text textcolor="#7c7c7c">{item.category}</Text>
                            <Text textcolor="#7c7c7c">{item.quantity}</Text>
                            <Text textcolor="#7c7c7c">{item.name}</Text>
                            <GroupButton marginright={".5rem"} largura={"100%"} background="#fff">
                                <button onClick={() => returnData({item})}>
                                    <FiEdit color={neutralColor} size={19}/>
                                </button>
                                <button onClick={() => handleDeleteItem(item.id)}>
                                    <AiOutlineDelete color={neutralColor} size={19}/>
                                </button>
                            </GroupButton> 
                        </ElementList>
                    )) :
                    <EmptyMessage>Sem registro de patrimônio</EmptyMessage>
                }
            </ListBody>
        </List>
    )
}

export default TableAccount;