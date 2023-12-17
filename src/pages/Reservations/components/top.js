import {
    TopItem,
    InputGroup,
    InputSearch,
    Icon
} from "../style";
import { FiDownload, FiPlus } from "react-icons/fi";
import Top from "../../../components/top/top";

const TopContent = () => {
    return (
        <TopItem>
            <Top children="Reservas Abertas" fontsize={19}/>
            <InputGroup>
                <InputSearch type="text" placeholder="Procurar" />
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