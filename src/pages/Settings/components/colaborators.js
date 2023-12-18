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
import { colaborators } from "../../../mocks/colaborators";
import { theme } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";

const Colaborators = () => {

    const { neutralColor } = theme;

    const navigate = useNavigate();

    const routeScreen = () => {
        return navigate("/settings/colaborators");
    }

    return (
        <ContentInfo gridcolumn={2} gridrow={4}>
            <Section>
                {colaborators.map(item => ( 
                    <Profile key={item.id}>
                        <span>
                            <ImageProfile src={item.img} alt={item.name} />
                            <InfoUser textcolor={neutralColor}>
                                <Name>{item.name}</Name>
                                <P>{item.type}</P>
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