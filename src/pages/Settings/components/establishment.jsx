import { BiEdit } from "react-icons/bi"
import { 
    ContentInfo, 
    ButtonEdit, 
    Image, 
    MenuEstablishment,
    InfoEstablishment,
    TextArea,
    P,
    Name,
    ElementLoading,
    Loading
} from "../style"
import camera from "../../../assets/camera.png"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../context/globalContext"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

const Establishment = () => {

    const { park, dataClient } = useUser()
    const { type_colaborator } = dataClient
    const { neutralColor } = theme

    const navigate = useNavigate()

    const noAdmin = type_colaborator !== "Administrador(a)"

    const routerScreen = () => {
        if(noAdmin) {
            alert("Você não tem permissão para editar as informações do estacionamento")
        } else {
            return navigate("/settings/establishment")
        }
    }

    const Menu = () => {
        if (park?.id == null) {
            return (
                <>
                    <ElementLoading>
                        <Spinner size={16} speed={1} /> 
                        <Loading>Carregando...</Loading>
                    </ElementLoading>
                </>
            )
        }

        return <>
            <MenuEstablishment>
                <Image src={park?.image ?? camera} alt={park?.name ?? "..."}/>
                <InfoEstablishment>
                    <TextArea textcolor={neutralColor}>
                        <P>Nome do Estabelecimento:</P>
                        <Name>{park?.name ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Razão Social:</P>
                        <Name>{park?.razao_social ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CNPJ:</P>
                        <Name>{park?.cnpj ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Telefone:</P>
                        <Name>{park?.contato ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>E-mail:</P>
                        <Name>{park?.email ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>CEP:</P>
                        <Name>{park?.cep ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Endereço:</P>
                        <Name>{park?.end ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Bairro:</P>
                        <Name>{park?.bairro ?? "..."}</Name>
                    </TextArea>
                    <TextArea textcolor={neutralColor}>
                        <P>Cidade:</P>
                        <Name>{park?.cidade ?? "..."}</Name>
                    </TextArea>
                </InfoEstablishment>
            </MenuEstablishment>
        </>
    }

    return (
        <ContentInfo gridcolumn={1} gridrow={"span 3"}>
            <ButtonEdit
                onClick={routerScreen}
            >
                <BiEdit size={22} color="#545454" />
            </ButtonEdit>
            <Menu />
        </ContentInfo>
    )
}

export default Establishment