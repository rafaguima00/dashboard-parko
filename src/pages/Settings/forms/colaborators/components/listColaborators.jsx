import { 
    ColaboratorsView,
    Profile,
    ImageProfile,
    InfoUser,
    Name,
    P,
    GroupButton,
    ColaboratorsList
} from "../style"
import GlobalButton from "../../../../../components/Button"
import { useUser } from "../../../../../context/globalContext" 
import avatar from "../../../../../assets/avatar.png"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"

const ListColaborators = (props) => {

    const { primaryColor, neutralColor } = props.theme
    const { selected, setSelected, setNewColaborator, loadingDel } = props.state
    const { deleteColaborator } = props
    const { colaborators, dataClient } = useUser()

    const handleClick = (item) => {
        setSelected(item.id)
        setNewColaborator(item)
    }

    function setNone() {
        setSelected("none")
        setNewColaborator({
            colaborator: "",
            cpf: "",
            data_nasc: "",
            e_admin: null,
            email: "",
            inicio_contrato: "",
            password: "",
            rg: "",
            tel: "",
            tipo_contratacao: null,
            unidade: dataClient.id_establishment
        })
    }

    return (
        <ColaboratorsView background={"#8371AE"}>
            <ColaboratorsList>
                {colaborators.map(item => ( 
                    <Profile 
                        key={item.id} 
                        bordercolor={neutralColor}
                        background={selected === item.id ? primaryColor : "none"} 
                        onClick={() => handleClick(item)}
                    >
                        <ImageProfile src={item.image ? item.image : avatar} alt={item.colaborator} />
                        <InfoUser textcolor={"#fff"}>
                            <Name>{item.colaborator}</Name>
                            <P>{item.type_colaborator}</P>
                        </InfoUser>
                    </Profile>
                ))}
            </ColaboratorsList>
            <GroupButton>
                <GlobalButton 
                    background={primaryColor}
                    children={"Adicionar"}
                    altura={"2.6rem"}
                    bold={true}
                    aoPressionar={setNone}
                />
                <GlobalButton 
                    background={"transparent"}
                    children={loadingDel ? <Bounce color="#f4f4f4" /> : "Remover"}
                    altura={"2.6rem"}
                    bold={true}
                    btborder={`2px solid ${primaryColor}`}
                    aoPressionar={e => deleteColaborator(selected, e)}
                />
            </GroupButton>
        </ColaboratorsView>
    )
}

export default ListColaborators