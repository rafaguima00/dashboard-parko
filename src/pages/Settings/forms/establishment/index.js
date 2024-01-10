import { ContainerForm } from "../style";
import { 
    Form,
    DivInput,
    Label,
    Input,
    DivButton
} from "./style";
import { theme } from "../../../../theme/theme";
import { forms } from "./map";
import GlobalButton from "../../../../components/button/button";
import TopForm from "../../components/topForm";
import { useNavigate } from "react-router-dom";

const FormEstablishment = () => {

    const { neutralColor, primaryColor, cancelColor, greenColor } = theme;

    const navigate = useNavigate();

    const screenBack = () => {
        return navigate("/settings")
    }

    return (
        <ContainerForm>
            <TopForm children={"Meu Estabelecimento"} />
            <Form>
                {forms.map(item => (
                    <DivInput key={item.id}>
                        <Label textcolor={neutralColor}>{item.label}</Label>
                        <Input 
                            type={item.type} 
                            placeholder={item.placeholder}
                            bordercolor={primaryColor} 
                            largura={item.largura}
                            required
                        />
                    </DivInput>
                ))}
            </Form>
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
        </ContainerForm>
    )
}

export default FormEstablishment;