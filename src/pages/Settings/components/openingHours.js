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
import { useContext } from "react";
import { ParkingContext } from "../../../context/parkingContext";

const OpeningHours = () => {

    const { neutralColor, primaryColor, cancelColor } = theme;

    const navigate = useNavigate();

    const routeScreen = () => {
        return navigate("/settings/funcionamento");
    }

    const { openHour, closeHour } = useContext(ParkingContext);

    return (
        <ContentInfo gridcolumn={"span 2"} gridrow={"span 1"}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color="#545454" />
            </ButtonEdit>
            <Menu>
                <Warning textcolor={neutralColor}>Em funcionamento de <strong>Segunda à Sábado</strong></Warning>
                <Hour textcolor={primaryColor}>
                    {openHour.monday.hour}:{openHour.monday.minute}h - {closeHour.monday.hour}:{closeHour.monday.minute}h
                </Hour>
                <hr/>
                <Warning textcolor={cancelColor}><strong>Não funcionamos nos feriados</strong></Warning>
            </Menu>
        </ContentInfo>
    )
}

export default OpeningHours;