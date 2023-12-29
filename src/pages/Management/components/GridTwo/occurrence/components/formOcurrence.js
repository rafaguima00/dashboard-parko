import { useState } from "react";
import { 
    FormArea, 
    GroupButton
} from "../style";
import GlobalButton from "../../../../../../components/button/button";
import FormList from "./formList";
import MissTicket from "../forms/missTicket";
import TheftCostumer from "../forms/theftCostumer";
import TheftHeritage from "../forms/theftHeritageItems";

const FormOcurrence = (props) => {

    const { cancelColor, greenColor, primaryColor } = props.colors;

    const [formActive, setFormActive] = useState(0);

    return (
        <FormArea>
            {formActive === 0 && <FormList setFormActive={setFormActive} primaryColor={primaryColor}/>}
            {formActive === 1 && <MissTicket />}
            {formActive === 2 && <TheftCostumer />}
            {formActive === 3 && <TheftHeritage />}
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
                />
            </GroupButton>
        </FormArea>
    )
}

export default FormOcurrence;