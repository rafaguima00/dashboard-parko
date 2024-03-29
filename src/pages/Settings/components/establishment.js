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
import camera from "../../../assets/camera.png";
import { theme } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/globalContext";
import { useEffect } from "react";
import ReadApi from "../../../services/readData";

const Establishment = () => {

    const { loadData } = ReadApi();
    const { park, dataClient } = useUser();
    const { type_colaborator } = dataClient;
    const { neutralColor } = theme;

    const navigate = useNavigate();

    const coordenador = type_colaborator === "Coordenador(a)";

    const routerScreen = () => {
        if(coordenador) {
            alert("Você não tem permissão para editar as informações do estacionamento");
        } else {
            return navigate("/settings/establishment");
        }
    };

    const renderItem = (data) => {
        if(coordenador) {
            return "";
        } else {
            if(park) {
                return park[data];
            } else {
                return "...";
            }
        }
    };

    return (
        <ContentInfo gridcolumn={1} gridrow={"span 3"}>
            <ButtonEdit
                onClick={routerScreen}
            >
                <BiEdit size={22} color="#545454" />
            </ButtonEdit>
            <MenuEstablishment>
                <Image src={park.image ? renderItem("image") : camera} alt={renderItem("name")}/>
                <InfoEstablishment>
                    <TextArea textcolor={neutralColor}>
                        <P>Nome do Estabelecimento:</P>
                        <Name>{renderItem("name")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Razão Social:</P>
                        <Name>{renderItem("razao_social")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CNPJ:</P>
                        <Name>{renderItem("cnpj")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Telefone:</P>
                        <Name>{renderItem("contato")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>E-mail:</P>
                        <Name>{renderItem("email")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CEP:</P>
                        <Name>{renderItem("cep")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Endereço:</P>
                        <Name>{renderItem("end")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Bairro:</P>
                        <Name>{renderItem("bairro")}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Cidade:</P>
                        <Name>{renderItem("cidade")}</Name>
                    </TextArea>
                </InfoEstablishment>
            </MenuEstablishment>
        </ContentInfo>
    )
}

export default Establishment;