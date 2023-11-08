import { 
    SecondTitle,
    IconGroup,
    Icon,
    InputSearch
} from "../style";
import { BiEdit } from "react-icons/bi";
import { BsCalendar4, BsDownload } from "react-icons/bs";

const SecondHeader = () => {
    return (
        <SecondTitle>
            <p><strong>Reservas</strong> fechadas</p>
            <IconGroup>
                <InputSearch type="text" placeholder="Procurar" />
                <Icon><BiEdit size={19} color="#545454" /></Icon>
                <Icon><BsCalendar4 size={16} color="#545454" /></Icon>
                <Icon><BsDownload size={16} color="#545454" /></Icon>
            </IconGroup>
        </SecondTitle>
    )
}

export default SecondHeader;