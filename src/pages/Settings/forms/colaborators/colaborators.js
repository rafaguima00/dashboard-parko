import { useNavigate } from "react-router-dom";
import { ContainerForm, Top } from "../style";

const ColaboratorsForm = () => {

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
                <p>Colaboradores</p>
            </Top>
        </ContainerForm>
    )
}

export default ColaboratorsForm;