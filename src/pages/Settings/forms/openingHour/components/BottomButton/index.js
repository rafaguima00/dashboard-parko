import GlobalButton from "../../../../../../components/button/button";
import { DivButton } from "../../../style";
import { useNavigate } from "react-router-dom";

const BottomButton = (props) => {

    const { cancelColor, greenColor } = props;

    const navigate = useNavigate();

    const screenBack = () => {
        return navigate("/settings")
    }

    return (
        <DivButton>
            <GlobalButton 
                children="Cancelar"
                background={cancelColor}
                largura={"12rem"}
                altura={"2.8rem"}
                aoPressionar={screenBack}
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