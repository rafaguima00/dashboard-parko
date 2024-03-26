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
import { useEffect, useState } from "react";
import { useUser } from "../../../context/globalContext";
import api from "../../../services/api/server";

const OpeningHours = () => {

    const { neutralColor, primaryColor, cancelColor } = theme;

    const navigate = useNavigate();

    const routeScreen = () => {
        return navigate("/settings/funcionamento");
    }

    const { dataClient } = useUser();

    const [horaAbertura, setHoraAbertura] = useState(null);
    const [horaFechamento, setHoraFechamento] = useState(null);

    const recuperarDados = async () => {
        await api.get(`/hora_funcionamento/${dataClient.id_establishment}`)
        .then(res => {
            setHoraAbertura(res.data[0].hora_abertura);
            setHoraFechamento(res.data[0].hora_fechamento);
        })
        .catch(e => {
            console.log(e);
        })
    };

    useEffect(() => {
        recuperarDados();
    }, []);

    return (
        <ContentInfo gridcolumn={"span 2"} gridrow={"span 1"}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color="#545454" />
            </ButtonEdit>
            <Menu>
                <Warning textcolor={neutralColor}>Em funcionamento de <strong>Segunda à Sábado</strong></Warning>
                <Hour textcolor={primaryColor}>
                    {horaAbertura}h - {horaFechamento}h
                </Hour>
                <hr/>
                <Warning textcolor={cancelColor}><strong>Não funcionamos nos feriados</strong></Warning>
            </Menu>
        </ContentInfo>
    )
}

export default OpeningHours;