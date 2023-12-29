import { 
    DivInput,
    Label,
    Input,
    DivButton
} from "../../style";
import { 
    FormContent,
    DivImage, 
    Image, 
    Edit 
} from "../style";
import avatar from "../../../../../assets/avatar.png";
import { FaRegEdit } from "react-icons/fa";
import { forms } from "../map";
import GlobalButton from "../../../../../components/button/button";
import { useNavigate } from "react-router-dom";

const FormColaborator = (props) => {

    const { primaryColor, neutralColor, cancelColor, greenColor } = props.theme;

    const navigate = useNavigate();

    const screenBack = () => {
        return navigate("/settings")
    }

    return (
        <FormContent>
            <DivImage>
                <Image src={avatar} alt="Avatar" />
                <Edit background={primaryColor} onClick={e => e.preventDefault()}>
                    <FaRegEdit size={17} color="#fff"/>
                </Edit>
            </DivImage>
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
            <DivButton marg={"3rem"}>
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
        </FormContent>
    )
}

export default FormColaborator;