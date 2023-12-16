import { useNavigate } from "react-router-dom";
import { ContainerForm, Top } from "../style";

const FormEstablishment = () => {

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
                <p>Meu estabelecimento</p>
            </Top>
        </ContainerForm>
    )
}

export default FormEstablishment;