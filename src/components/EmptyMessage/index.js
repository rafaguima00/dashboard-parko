import { AlignText, Line } from "../../pages/Start/style";
import { theme } from "../../theme/theme";

const EmptyMessage = ({ children }) => {

    const { neutralColor } = theme;

    return (
        <AlignText>
            <Line textcolor={neutralColor}>{children}</Line>
        </AlignText>
    )
}

export default EmptyMessage;