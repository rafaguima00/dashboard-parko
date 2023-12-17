import {
    ButtonGroup
} from "../style";
import GlobalButton from "../../../components/button/button";
import { theme } from "../../../theme/theme";

const Buttons = () => {

    const { cancelColor, primaryColor } = theme;

    return (
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
            />
            <GlobalButton 
                children="Retirada"
                background={primaryColor}
                largura={"7rem"}
            />
        </ButtonGroup>
    )
}

export default Buttons;