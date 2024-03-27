import { BiEdit } from "react-icons/bi";
import { 
    ContentInfo, 
    Section,
    EditProfile, 
    ImageProfile,
    Profile,
    InfoUser,
    Name, 
    P
} from "../style";
import { theme } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/globalContext";

const Colaborators = () => {

    const { colaborators, dataClient } = useUser();
    const { type_colaborator } = dataClient;
    const { neutralColor } = theme;

    const coordenador = type_colaborator === "Coordenador(a)";

    const navigate = useNavigate();

    const routeScreen = () => {
        if(coordenador) {
            alert("Você não tem permissão para editar os dados dos colaboradores");
        } else {
            return navigate("/settings/colaborators");
        }
    }

    return (
        <ContentInfo gridcolumn={2} gridrow={4}>
            <Section>
                {colaborators.map(item => ( 
                    <Profile key={item.id}>
                        <span>
                            <ImageProfile src={item.img} alt={item.colaborator} />
                            <InfoUser textcolor={neutralColor}>
                                <Name>{item.colaborator}</Name>
                                <P>{item.type_colaborator}</P>
                            </InfoUser>
                        </span>
                        <EditProfile onClick={routeScreen}>
                            <BiEdit size={22} color={neutralColor} />
                        </EditProfile>
                    </Profile>
                ))}
            </Section>
        </ContentInfo>
    )
}

export default Colaborators;