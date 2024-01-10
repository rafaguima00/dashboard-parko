import {
    ButtonGroup
} from "../style";
import GlobalButton from "../../../components/button/button";
import { theme } from "../../../theme/theme";

const Buttons = ({ setOpen, setOpenRetirada }) => {

    const { cancelColor, primaryColor } = theme;

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
                />
                <GlobalButton 
                    children="Retirada"
                    background={primaryColor}
                    largura={"7rem"}
                    aoPressionar={() => setOpenRetirada(true)}
                />
            </ButtonGroup>
        </>
    )
}

export default Buttons;