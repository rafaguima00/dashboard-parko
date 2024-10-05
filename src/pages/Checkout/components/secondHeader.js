import { 
    SecondTitle,
    IconGroup,
    Icon,
    InputSearch
} from "../style";
import { BiEdit } from "react-icons/bi";
import { BsCalendar4, BsDownload } from "react-icons/bs";
import { theme } from "../../../theme/theme";
import Top from "../../../components/Top";

const SecondHeader = (props) => {

    const { primaryColor } = theme;
    const { text, setText } = props.states;

    return (
        <SecondTitle>
            <Top children="Reservas Fechadas" font={19} />
            <IconGroup>
                <InputSearch 
                    inputcolor={primaryColor} 
                    type="text" 
                    placeholder="Procurar" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Icon><BiEdit size={17} color="#545454" /></Icon>
                <Icon><BsCalendar4 size={14} color="#545454" /></Icon>
                <Icon><BsDownload size={14} color="#545454" /></Icon>
            </IconGroup>
        </SecondTitle>
    )
}

export default SecondHeader;