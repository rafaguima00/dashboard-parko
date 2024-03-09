import {
    Timing,
    View,
    Name,
    Clock
} from "../style";
import { theme } from "../../../theme/theme";

const TimingReserve = (props) => {

    const { primaryColor } = theme;
    const { name } = props;

    return (
        <Timing background={primaryColor}>
            <Clock>
                <p>Tempo de permanência</p>
                <p>00:00:00</p>
            </Clock>
            <View>
                <Name>Caixa responsável:</Name>
                <Name>{name ? name : "[user_name]"}</Name>
            </View>
        </Timing>
    )
}

export default TimingReserve;