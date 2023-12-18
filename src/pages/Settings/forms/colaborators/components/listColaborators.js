import { 
    ColaboratorsView,
    Profile,
    ImageProfile,
    InfoUser,
    Name,
    P,
    GroupButton
} from "../../style";
import { colaborators } from "../../../../../mocks/colaborators";
import GlobalButton from "../../../../../components/button/button";

const ListColaborators = (props) => {

    const { primaryColor, neutralColor } = props.theme;

    return (
        <ColaboratorsView background={"#8371AE"}>
            <span>
                {colaborators.map(item => ( 
                    <Profile key={item.id} bordercolor={neutralColor}>
                        <ImageProfile src={item.img} alt={item.name} />
                        <InfoUser textcolor={"#fff"}>
                            <Name>{item.name}</Name>
                            <P>{item.type}</P>
                        </InfoUser>
                    </Profile>
                ))}
            </span>
            <GroupButton>
                <GlobalButton 
                    background={primaryColor}
                    children="Adicionar"
                    altura={"2.6rem"}
                    bold={true}
                />
                <GlobalButton 
                    background={"transparent"}
                    children="Remover"
                    altura={"2.6rem"}
                    bold={true}
                    btborder={`2px solid ${primaryColor}`}
                />
            </GroupButton>
        </ColaboratorsView>
    )
}

export default ListColaborators;