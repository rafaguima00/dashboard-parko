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

const Establishment = () => {

    const { neutralColor } = theme;

    const navigate = useNavigate();

    const routerScreen = () => {
        return navigate("/settings/establishment")
    }

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
                        <Name>Bela Park</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Razão Social:</P>
                        <Name>Bela Park LTDA</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CNPJ:</P>
                        <Name>91.679.663/0001-30</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Telefone:</P>
                        <Name>(71) 98855-9060</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>E-mail:</P>
                        <Name>belapark@gmail.com</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CEP:</P>
                        <Name>41058-025</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Endereço:</P>
                        <Name>Al. do Bosque, 736</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Bairro:</P>
                        <Name>Horto Bela Vista</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Cidade:</P>
                        <Name>Salvador</Name>
                    </TextArea>
                </InfoEstablishment>
            </MenuEstablishment>
        </ContentInfo>
    )
}

export default Establishment;