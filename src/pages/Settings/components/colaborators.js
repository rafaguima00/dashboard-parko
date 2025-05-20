import { BiEdit } from "react-icons/bi"
import { 
    ContentInfo, 
    Section,
    EditProfile, 
    ImageProfile,
    Profile,
    InfoUser,
    Name, 
    P,
    NewColaborator,
    BtNewColaborator,
    Add,
    Text
} from "../style"
import { theme } from "../../../theme/theme"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../context/globalContext"
import avatar from "../../../assets/avatar.png"

const Colaborators = () => {

    const { colaborators, dataClient } = useUser()
    const { type_colaborator } = dataClient
    const { neutralColor } = theme

    const coordenador = type_colaborator === "Coordenador(a)"
    const funcionario = type_colaborator === "Funcionário(a)"

    const navigate = useNavigate()

    const routeScreen = (item) => {
        if(coordenador || funcionario) {
            alert("Você não tem permissão para editar os dados dos colaboradores")
            return
        } 

        if(item) {
            return navigate("/settings/colaborators", {
                state: {
                    selectedColaborator: item
                }
            })
        }
        
        return navigate("/settings/colaborators")
    }

    const navigateWithOutId = () => {
        if(coordenador || funcionario) {
            alert("Você não tem permissão para editar os dados dos colaboradores")
        } else {
            return navigate("/settings/colaborators")
        }
    }

    return (
        <ContentInfo gridcolumn={2} gridrow={4} altura={"384.45px"}>
            <Section>
                {colaborators.map(item => ( 
                    <Profile key={item.id}>
                        <span>
                            <ImageProfile src={item.image || avatar} alt={item.colaborator || ""} />
                            <InfoUser textcolor={neutralColor}>
                                <Name>{item.colaborator || ""}</Name>
                                <P>{item.type_colaborator || ""}</P>
                            </InfoUser>
                        </span>
                        <EditProfile onClick={() => {
                            console.log("clicou")
                            routeScreen(item)
                        }}>
                            <BiEdit size={22} color={neutralColor} />
                        </EditProfile>
                    </Profile>
                ))}
            </Section>
            <NewColaborator>
                <BtNewColaborator onClick={navigateWithOutId}>
                    <Add>+</Add>
                    <Text textcolor={neutralColor}>{"Inserir novo colaborador"}</Text>
                </BtNewColaborator>
            </NewColaborator>
        </ContentInfo>
    )
}

export default Colaborators