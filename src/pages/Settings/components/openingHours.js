import { BiEdit } from "react-icons/bi";
import { 
    ContentInfo, 
    ButtonEdit,
    Menu,
    Warning,
    Hour
} from "../style";
import { theme } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";

const OpeningHours = () => {

    const { neutralColor, primaryColor, cancelColor } = theme;

    const navigate = useNavigate();

    const routeScreen = () => {
        return navigate("/settings/funcionamento");
    }

    return (
        <ContentInfo gridColumn={"span 2"} gridRow={"span 1"}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color="#545454" />
            </ButtonEdit>
            <Menu>
                <Warning textColor={neutralColor}>Em funcionamento de <strong>Segunda à Sábado</strong></Warning>
                <Hour textColor={primaryColor}>08:00h - 22:00h</Hour>
                <hr/>
                <Warning textColor={cancelColor}><strong>Não funcionamos nos feriados</strong></Warning>
            </Menu>
        </ContentInfo>
    )
}

export default OpeningHours;