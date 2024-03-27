import { 
    SecondTitle,
    IconGroup,
    Icon,
    InputSearch
} from "../style";
import { BiEdit } from "react-icons/bi";
import { BsCalendar4, BsDownload } from "react-icons/bs";
import { theme } from "../../../theme/theme";
import Top from "../../../components/top";

const SecondHeader = () => {

    const { primaryColor } = theme;

    return (
        <SecondTitle>
            <Top children="Reservas Fechadas" font={19} />
            <IconGroup>
                <InputSearch inputcolor={primaryColor} type="text" placeholder="Procurar" />
                <Icon><BiEdit size={19} color="#545454" /></Icon>
                <Icon><BsCalendar4 size={16} color="#545454" /></Icon>
                <Icon><BsDownload size={16} color="#545454" /></Icon>
            </IconGroup>
        </SecondTitle>
    )
}

export default SecondHeader;