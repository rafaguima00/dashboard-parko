import GlobalButton from "../../../../../../components/button/button";
import { DivButton } from "../../../style";

const BottomButton = (props) => {

    const { cancelColor, greenColor } = props;

    return (
        <DivButton>
            <GlobalButton 
                children="Cancelar"
                background={cancelColor}
                largura={"12rem"}
                altura={"2.8rem"}
            />
            <GlobalButton 
                children="Salvar"
                background={greenColor}
                largura={"12rem"}
                altura={"2.8rem"}
            />
        </DivButton>
    )
}

export default BottomButton;