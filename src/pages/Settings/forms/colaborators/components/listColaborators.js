import { 
    ColaboratorsView,
    Profile,
    ImageProfile,
    InfoUser,
    Name,
    P,
    GroupButton
} from "../style";
import GlobalButton from "../../../../../components/button";
import { useUser } from "../../../../../context/globalContext"; 

const ListColaborators = (props) => {

    const { primaryColor, neutralColor } = props.theme;
    const { selected, setSelected, newColaborator, setNewColaborator } = props.state;
    const { handleCreateColaborator, deleteColaborator } = props;

    const { colaborators } = useUser();

    const handleClick = (item) => {
        setSelected(item.id);
        setNewColaborator(item);
    }

    return (
        <ColaboratorsView background={"#8371AE"}>
            <span>
                {colaborators.map(item => ( 
                    <Profile 
                        key={item.id} 
                        bordercolor={neutralColor}
                        background={selected === item.id ? primaryColor : "none"} 
                        onClick={() => handleClick(item)}
                    >
                        <ImageProfile src={item.img} alt={item.colaborator} />
                        <InfoUser textcolor={"#fff"}>
                            <Name>{item.colaborator}</Name>
                            <P>{item.type_colaborator}</P>
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
                    aoPressionar={e => handleCreateColaborator(e, newColaborator)}
                />
                <GlobalButton 
                    background={"transparent"}
                    children="Remover"
                    altura={"2.6rem"}
                    bold={true}
                    btborder={`2px solid ${primaryColor}`}
                    aoPressionar={() => deleteColaborator(selected)}
                />
            </GroupButton>
        </ColaboratorsView>
    )
}

export default ListColaborators;