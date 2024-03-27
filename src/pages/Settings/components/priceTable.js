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
import api from "../../../services/api/server";
import { useEffect } from "react";
import { useUser } from "../../../context/globalContext";
import { formatCurrency } from "../../../services/formatCurrency";

const PriceTable = () => {
    
    const { neutralColor, primaryColor, cancelColor } = theme;
    const { dataClient, priceTable, setPriceTable } = useUser();
    
    const navigate = useNavigate();

    const routeScreen = () => {
        return navigate("/settings/table");
    };

    const getPriceTable = async () => {
        await api.get(`/tabela_preco/${dataClient.id_establishment}`)
        .then(res => {
            setPriceTable(res.data[0]);
        }) 
        .catch(e => {
            console.log(e);
        })
    };

    useEffect(() => {
        getPriceTable();
    }, []);

    const tempoTolerancia = () => {
        if(priceTable !== undefined) {
            if(priceTable.tempo_tolerancia === null) {
                return <strong>Não há tempo de tolerância</strong>
            } else {
                return <strong>Tempo de tolerância: {priceTable.tempo_tolerancia} minutos</strong>
            }
        } else {
            return "";
        }
    };

    const tempo = tempoTolerancia();

    const valorHora = () => {
        const valueHour = priceTable.valor_hora;

        if(valueHour !== undefined) {
            return formatCurrency(valueHour, 'BRL');
        } else {
            return "";
        }
    };

    const valor = valorHora();

    return (
        <ContentInfo gridcolumn={3} gridrow={4}>
            <ButtonEdit onClick={routeScreen}>
                <BiEdit size={22} color={neutralColor} />
            </ButtonEdit>
            <Menu>
                <Warning textcolor={neutralColor}>Valor da hora</Warning>
                <Hour textcolor={primaryColor}>{valor}</Hour>
                <hr/>
                <Warning textcolor={cancelColor}>{tempo}</Warning>
            </Menu>
        </ContentInfo>
    )
};

export default PriceTable;