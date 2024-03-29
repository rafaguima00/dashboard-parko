import {
    TopItem,
    InputGroup,
    InputSearch,
    Icon
} from "../style";
import { FiDownload, FiPlus } from "react-icons/fi";
import Top from "../../../components/Top";

const TopContent = (props) => {

    const { text, setText } = props.states;

    return (
        <TopItem>
            <Top children="Reservas Abertas" font={19}/>
            <InputGroup>
                <InputSearch 
                    type="text" 
                    placeholder="Procurar" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Icon>
                    <FiPlus color="#545454" size={16} />
                </Icon>
                <Icon>
                    <FiDownload color="#545454" size={16} />
                </Icon>
            </InputGroup>
        </TopItem>
    )
}

export default TopContent;