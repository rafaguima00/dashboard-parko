import {
    Top,
    Title,
    InputGroup,
    InputSearch,
    Icon
} from "../style";
import { FiDownload, FiPlus } from "react-icons/fi";

const TopContent = () => {
    return (
        <Top>
            <Title><strong>Reservas</strong> Abertas</Title>
            <InputGroup>
                <InputSearch type="text" placeholder="Procurar" />
                <Icon>
                    <FiPlus color="#545454" size={16} />
                </Icon>
                <Icon>
                    <FiDownload color="#545454" size={16} />
                </Icon>
            </InputGroup>
        </Top>
    )
}

export default TopContent;