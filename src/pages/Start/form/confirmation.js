import { SmallText } from "./style";
import { theme } from "../../../theme/theme";

const Confirmation = () => {

    const { neutralColor } = theme;

    return (
        <div>
            <SmallText textcolor={neutralColor}>
                Escreva o Código de Confirmação do cliente abaixo:
            </SmallText>
        </div>
    )
}

export default Confirmation;