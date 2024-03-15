import { useContext } from "react";
import { GlobalContext } from "../../../../../../context/globalContext";
import { 
    FormArea, 
    GroupButton
} from "../style";
import GlobalButton from "../../../../../../components/button/button";
import FormList from "./formList";
import MissTicket from "../forms/missTicket";
import TheftCostumer from "../forms/theftCostumer";
import TheftHeritage from "../forms/theftHeritageItems";
import api from "../../../../../../services/api/server";

const FormOcurrence = (props) => {

    const { dataClient } = useContext(GlobalContext);

    const { id_establishment } = dataClient;
    const { cancelColor, greenColor, primaryColor } = props.colors;
    const { formActive, setFormActive, occurrenceItem, setOccurrenceItem } = props.state;

    const handleSave = async (idOccurrence) => {

        await api.post("/occurrence", {
            local: occurrenceItem.local,
            data: occurrenceItem.data,
            numero_comanda: occurrenceItem.num_comanda,
            nome_cliente: occurrenceItem.nome_cliente,
            veiculo: occurrenceItem.veiculo,
            placa_veiculo: occurrenceItem.placa_veiculo,
            cor_veiculo: occurrenceItem.cor_veiculo,
            num_doc: occurrenceItem.num_doc,
            renavam: occurrenceItem.renavam,
            data_entrada: occurrenceItem.data_entrada, 
            hora_entrada: occurrenceItem.hora_entrada,
            value: occurrenceItem.value,
            desc_item: occurrenceItem.desc_item,
            bem_furtado: occurrenceItem.bem_furtado,
            num_bo: occurrenceItem.num_bo,
            id_occurrence: idOccurrence,
            id_establishment: id_establishment
        })
        .then(() => {
            alert("Sucesso");
        })
        .catch(e => {
            console.log(e);
        })
    };

    return (
        <FormArea>
            {
                // lista de tipos de formulário para ser aberto ao clicar
                formActive === 0 && 
                <FormList 
                    state={{ setFormActive, setOccurrenceItem }} 
                    primaryColor={primaryColor}
                />
            } 
            { 
                // Formulário de perda de ticket
                formActive === 1 && 
                <MissTicket 
                    state={{ occurrenceItem, setOccurrenceItem }} 
                />
            }
            {
                // Formulário de furto de bens do cliente
                formActive === 2 && 
                <TheftCostumer 
                    state={{ occurrenceItem, setOccurrenceItem }} 
                />
            } 
            {
                // Formulário de Furto de itens do patrimônio
                formActive === 3 && 
                <TheftHeritage 
                    state={{ occurrenceItem, setOccurrenceItem }} 
                />
            }
            <GroupButton>
                <GlobalButton 
                    children="Cancelar" 
                    background={cancelColor} 
                    largura={"100%"}
                    aoPressionar={() => setFormActive(0)}
                />
                <GlobalButton 
                    children="Salvar" 
                    background={greenColor} 
                    largura={"100%"}
                    aoPressionar={() => handleSave(formActive)}
                />
            </GroupButton>
        </FormArea>
    )
}

export default FormOcurrence;