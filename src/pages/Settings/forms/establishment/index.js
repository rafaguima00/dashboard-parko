import { ContainerForm } from "../style";
import { theme } from "../../../../theme/theme";
import TopForm from "../../components/topForm";
import FormParking from "./formParking";

const FormEstablishment = () => {

    const { neutralColor, primaryColor, cancelColor, greenColor } = theme;

    return (
        <ContainerForm>
            <TopForm children={"Meu Estabelecimento"} />
            <FormParking colors={{ neutralColor, primaryColor, cancelColor, greenColor }} />
        </ContainerForm>
    )
}

export default FormEstablishment;