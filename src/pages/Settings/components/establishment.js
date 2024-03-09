import { BiEdit } from "react-icons/bi";
import { 
    ContentInfo, 
    ButtonEdit, 
    Image, 
    MenuEstablishment,
    InfoEstablishment,
    TextArea,
    P,
    Name
} from "../style";
import parking from "../../../assets/estacionamento.png";
import { theme } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"; 
import { GlobalContext } from "../../../context/globalContext";

const Establishment = () => {

    const { neutralColor } = theme;

    const navigate = useNavigate();

    const routerScreen = () => {
        return navigate("/settings/establishment")
    }

    const { park } = useContext(GlobalContext);

    return (
        <ContentInfo gridcolumn={1} gridrow={"span 3"}>
            <ButtonEdit
                onClick={routerScreen}
            >
                <BiEdit size={22} color="#545454" />
            </ButtonEdit>
            <MenuEstablishment>
                <Image src={parking} alt="Bela Park"/>
                <InfoEstablishment>
                    <TextArea textcolor={neutralColor}>
                        <P>Nome do Estabelecimento:</P>
                        <Name>{park.name}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Razão Social:</P>
                        <Name>{park.razao_social}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CNPJ:</P>
                        <Name>{park.cnpj}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Telefone:</P>
                        <Name>{park.contato}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>E-mail:</P>
                        <Name>{park.email}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CEP:</P>
                        <Name>{park.cep}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Endereço:</P>
                        <Name>{park.end}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Bairro:</P>
                        <Name>{park.bairro}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Cidade:</P>
                        <Name>{park.cidade}</Name>
                    </TextArea>
                </InfoEstablishment>
            </MenuEstablishment>
        </ContentInfo>
    )
}

export default Establishment;