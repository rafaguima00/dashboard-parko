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

const TableAccount = (props) => {

    const { neutralColor } = props;

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
                <ElementList>
                    <Text textcolor="#7c7c7c">0001</Text>
                    <Text textcolor="#7c7c7c">Meterial de escritório</Text>
                    <Text textcolor="#7c7c7c">1</Text>
                    <Text textcolor="#7c7c7c">Caixa de canetas</Text>
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
                    <Text textcolor="#7c7c7c">0002</Text>
                    <Text textcolor="#7c7c7c">Imóvel</Text>
                    <Text textcolor="#7c7c7c">1</Text>
                    <Text textcolor="#7c7c7c">Terreno Loja 1</Text>
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