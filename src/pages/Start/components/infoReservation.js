import {
    InfoReservation,
    GroupInfo,
    Title,
    Subtitle,
    Info,
    GroupButton
} from "../style";
import { formatCurrency } from "../../../services/formatCurrency";
import { CgNotes } from "react-icons/cg";
import { FaRightLeft } from "react-icons/fa6";
import GlobalButton from "../../../components/button/button";
import { theme } from "../../../theme/theme";

const InfoReserve = () => {

    const styleIcon = {
        position: "absolute",
        right: 0,
        top: 0,
        margin: 10
    }

    const { primaryColor, cancelColor } = theme;

    return (
        <InfoReservation>
            <GroupInfo>
                <Info>
                    <Title>10/24</Title>
                    <Subtitle style={{ color: "#f4f4f4" }}>Vagas disponíveis</Subtitle>
                </Info>
                <Info>
                    <CgNotes color="#545454" size={16} title="Checkout" style={styleIcon} />
                    <Title>{formatCurrency(13300.90, 'BRL')}</Title>
                    <Subtitle>Faturamento diário</Subtitle>
                </Info>
                <Info>
                    <FaRightLeft color="#545454" size={16} title="Arrow" style={styleIcon} />
                    <Title>1000</Title>
                    <Subtitle>Número de pessoas no dia</Subtitle>
                </Info>
                <Info>
                    <Title>72,1%</Title>
                    <Subtitle>Satisfação do cliente</Subtitle>
                </Info>
            </GroupInfo>
            <GroupButton>
                <GlobalButton
                    background={primaryColor}
                    children="+ Nova Reserva"
                    altura={"2rem"}
                />
                <GlobalButton
                    background={primaryColor}
                    children="Abrir Caixa"
                    altura={"2rem"}
                />
                <GlobalButton
                    background={cancelColor}
                    children="Fechar Caixa"
                    altura={"2rem"}
                />
            </GroupButton>
        </InfoReservation>
    )
}

export default InfoReserve;