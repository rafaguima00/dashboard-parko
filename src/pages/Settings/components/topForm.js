import { Top, Icon, Text } from "../forms/style";
import { FaArrowLeft } from "react-icons/fa6";
import { theme } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";

const TopForm = ({ children }) => {

    const { neutralColor } = theme;

    const navigate = useNavigate();

    const routerScreen = () => {
        return navigate("/settings")
    }

    const firstWord = children.split(" ")[0];
    const removeFirstWord = children.replace(firstWord, "");

    return (
        <Top>
            <Icon
                onClick={routerScreen}
            >
                <FaArrowLeft size={19} color={neutralColor} />
            </Icon>
            <Text textcolor={neutralColor}>
                <strong>{firstWord}</strong>{removeFirstWord}
            </Text>
        </Top>
    )
}

export default TopForm;