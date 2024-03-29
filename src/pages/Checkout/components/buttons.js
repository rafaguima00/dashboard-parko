import {
    ButtonGroup
} from "../style";
import GlobalButton from "../../../components/Button";
import { theme } from "../../../theme/theme";
import { useUser } from "../../../context/globalContext";

const Buttons = ({ setOpen, setOpenRetirada }) => {

    const { cancelColor, primaryColor } = theme;
    const { dataClient } = useUser();

    return (
        <>
            <ButtonGroup>
                <GlobalButton 
                    children="Fechar Caixa"
                    background={cancelColor}
                    largura={"7rem"}
                />
                <GlobalButton 
                    children="Aporte"
                    background={primaryColor}
                    largura={"7rem"}
                    aoPressionar={() => setOpen(true)}
                    disabled={dataClient.type_colaborator === "Funcionário(a)" ? true : false}
                />
                <GlobalButton 
                    children="Retirada"
                    background={primaryColor}
                    largura={"7rem"}
                    aoPressionar={() => setOpenRetirada(true)}
                    disabled={dataClient.type_colaborator === "Funcionário(a)" ? true : false}
                />
            </ButtonGroup>
        </>
    )
}

export default Buttons;