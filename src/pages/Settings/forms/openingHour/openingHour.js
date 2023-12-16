import { useNavigate } from "react-router-dom";
import { ContainerForm, Top } from "../style";

const FormOpening = () => {

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
                <p>Horário de funcionamento</p>
            </Top>
        </ContainerForm>
    )
}

export default FormOpening;