import { BiEdit } from "react-icons/bi";
import { 
    ContentInfo, 
    ButtonEdit,
    Menu,
    Warning,
    Hour
} from "../style";
import { theme } from "../../../theme/theme";
import { formatCurrency } from "../../../services/formatCurrency";
import { useNavigate } from "react-router-dom";

const PriceTable = () => {
    
    const { neutralColor, primaryColor, cancelColor } = theme;
    
    const navigate = useNavigate();

    const routeScreen = () => {
        return navigate("/settings/table");
    }

    return (
        <ContentInfo gridcolumn={3} gridrow={4}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color={neutralColor} />
            </ButtonEdit>
            <Menu>
                <Warning textcolor={neutralColor}>Valor da hora</Warning>
                <Hour textcolor={primaryColor}>{formatCurrency(10, "BRL")+"/h"}</Hour>
                <hr/>
                <Warning textcolor={cancelColor}><strong>Não há tempo de tolerância</strong></Warning>
            </Menu>
        </ContentInfo>
    )
}

export default PriceTable;