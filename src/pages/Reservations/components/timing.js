import {
    Timing,
    View,
    Name,
    Clock
} from "../style";

const TimingReserve = ({ username }) => {
    return (
        <Timing>
            <Clock>
                <p>Tempo de permanência</p>
                <p>00:00:00</p>
            </Clock>
            <View>
                <Name>Caixa responsável:</Name>
                <Name>{username ? username : "[user_name]"}</Name>
            </View>
        </Timing>
    )
}

export default TimingReserve;