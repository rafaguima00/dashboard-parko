import { useState } from "react";
import {
    InfoReservation,
    GroupInfo,
    TitleLine,
    Subtitle,
    Info,
    TextAligned,
    GroupButton
} from "../style";
import { formatCurrency } from "../../../services/formatCurrency";
import { CgNotes } from "react-icons/cg";
import { FaRightLeft } from "react-icons/fa6";
import GlobalButton from "../../../components/button/button";
import { theme } from "../../../theme/theme";
import { Chart as ChartJS, ArcElement, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { data, options } from "../datasets/doughnut";
import { dataClient, optionsClient } from "../datasets/dgClientSatisfation";
import Modal from "../../../components/Modal";
import NewReservation from "../form/newReservation";
import Confirmation from "../form/confirmation";

ChartJS.register(ArcElement, Title);

const InfoReserve = () => {

    const styleIcon = {
        position: "absolute",
        right: 0,
        top: 0,
        margin: 10
    }

    const { primaryColor, cancelColor } = theme;

    const [open, setOpen] = useState(false);

    return (
        <InfoReservation>
            <GroupInfo>
                <Info>
                    <span>
                        <TitleLine>10/24</TitleLine>
                        <Subtitle style={{ color: "#f4f4f4" }}>Vagas disponíveis</Subtitle>
                    </span>
                    <div style={{ width: 64, height: 64 }}>
                        <Doughnut
                            data={data}
                            options={options}
                        />
                    </div>
                </Info>
                <Info>
                    <CgNotes color="#545454" size={16} title="Checkout" style={styleIcon} />
                    <TextAligned>
                        <TitleLine>{formatCurrency(13300.90, 'BRL')}</TitleLine>
                        <Subtitle>Faturamento diário</Subtitle>
                    </TextAligned>
                </Info>
                <Info>
                    <FaRightLeft color="#545454" size={16} title="Arrow" style={styleIcon} />
                    <TextAligned>
                        <TitleLine>1000</TitleLine>
                        <Subtitle>Número de pessoas no dia</Subtitle>
                    </TextAligned>
                </Info>
                <Info>
                    <span>
                        <TitleLine>72,1%</TitleLine>
                        <Subtitle>Satisfação do cliente</Subtitle>
                    </span>
                    <div style={{ width: 64, height: 64 }}>
                        <Doughnut
                            data={dataClient}
                            options={optionsClient}
                        />
                    </div>
                </Info>
            </GroupInfo>
            <GroupButton>
                <GlobalButton
                    background={primaryColor}
                    children="+ Nova Reserva"
                    altura={"2rem"}
                    aoPressionar={() => setOpen(true)}
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
            <Modal 
                isOpen={open} 
                setOpen={setOpen} 
                title={"Nova Reserva"}
                maxWidth={"52rem"}
            >
                <NewReservation />
            </Modal>
        </InfoReservation>
    )
}

export default InfoReserve;