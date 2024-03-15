import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { formatCurrency } from "../../../../../../services/formatCurrency";
import { GroupButton } from "../../../../style";
import { 
    ElementList, 
    List, 
    ListBody, 
    ListHeader, 
    Text
} from "../style";
import api from "../../../../../../services/api/server";

const TableAccount = (props) => {

    const { neutralColor, filterAccounts } = props;

    const handleDeleteItem = async (id) => {
        await api.delete(`/accounts/${id}`)
        .then(() => alert("Item excluído da lista"))
        .catch(e => console.log(e))
    };

    return (
        <List>
            <ListHeader>
                <Text textcolor="#bababa">Categoria</Text>
                <Text textcolor="#bababa">Data</Text>
                <Text textcolor="#bababa">Descrição</Text>
                <Text textcolor="#bababa">Valor</Text>
                <Text textcolor="#bababa">Ação</Text>
            </ListHeader>
            <ListBody>
                {filterAccounts.map(item => (
                    <ElementList>
                        <Text textcolor="#7c7c7c">{item.category}</Text>
                        <Text textcolor="#7c7c7c">{item.date_created}</Text>
                        <Text textcolor="#7c7c7c">{item.desc_item}</Text>
                        <Text textcolor="#7c7c7c">{formatCurrency(item.value, 'BRL')}</Text>
                        <GroupButton marginright={".5rem"} largura={"100%"} background="#fff">
                            <button>
                                <FiEdit color={neutralColor} size={19}/>
                            </button>
                            <button onClick={() => handleDeleteItem(item.id)}>
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