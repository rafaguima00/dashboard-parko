import { AlignText, Line } from "../style";
import { theme } from "../../../theme/theme";

const NoReservation = ({children}) => {

    const { neutralColor } = theme;

    return (
        <AlignText>
            <Line textcolor={neutralColor}>{children}</Line>
        </AlignText>
    )
}

export default NoReservation;