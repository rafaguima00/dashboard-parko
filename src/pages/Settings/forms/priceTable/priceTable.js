import { useNavigate } from "react-router-dom";
import { ContainerForm, Top } from "../style";

const PriceTableForm = () => {

    const navigate = useNavigate();

    const routerScreen = () => {
        return navigate("/settings")
    }

    return (
        <ContainerForm>
            <Top>
                <button
                    onClick={routerScreen}
                >
                    voltar
                </button>
                <p>Tabela de preços</p>
            </Top>
        </ContainerForm>
    )
}

export default PriceTableForm;