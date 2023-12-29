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

const TableAccount = (props) => {

    const { neutralColor } = props;

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
                <ElementList>
                    <Text textcolor="#7c7c7c">Energia</Text>
                    <Text textcolor="#7c7c7c">xx/xx/xxxx</Text>
                    <Text textcolor="#7c7c7c">Energia</Text>
                    <Text textcolor="#7c7c7c">{formatCurrency(1000, 'BRL')}</Text>
                    <GroupButton marginright={".5rem"} largura={"100%"} background="#fff">
                        <button>
                            <FiEdit color={neutralColor} size={19}/>
                        </button>
                        <button>
                            <AiOutlineDelete color={neutralColor} size={19}/>
                        </button>
                    </GroupButton> 
                </ElementList>
                <ElementList>
                    <Text textcolor="#7c7c7c">Energia</Text>
                    <Text textcolor="#7c7c7c">xx/xx/xxxx</Text>
                    <Text textcolor="#7c7c7c">Energia</Text>
                    <Text textcolor="#7c7c7c">{formatCurrency(1000, 'BRL')}</Text>
                    <GroupButton marginright={".5rem"} largura={"100%"} background="#fff">
                        <button>
                            <FiEdit color={neutralColor} size={19}/>
                        </button>
                        <button>
                            <AiOutlineDelete color={neutralColor} size={19}/>
                        </button>
                    </GroupButton> 
                </ElementList>
            </ListBody>
        </List>
    )
}

export default TableAccount;