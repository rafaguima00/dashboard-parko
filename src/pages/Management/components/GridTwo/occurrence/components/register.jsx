import EmptyMessage from "../../../../../../components/EmptyMessage"
import { RegisterArea, Item, Text, Icon } from "../style"
import { FiEye } from "react-icons/fi"

const Register = (props) => {

    const { neutralColor, primaryColor, formOccurrence } = props
    const { selectOccurrence } = props.array

    return (
        <RegisterArea>
            {selectOccurrence.length > 0 ? 
                selectOccurrence.map(item => (
                    <Item>
                        <Text textcolor={neutralColor}>Ocorrência {item.cod}</Text>
                        <Icon onClick={() => formOccurrence(item)} buttoncolor={primaryColor}>
                            <FiEye size={22} color="#fff" />
                        </Icon>
                    </Item>
                )) :
                <EmptyMessage>Sem registro de ocorrências</EmptyMessage>
            }
        </RegisterArea>
    )
}

export default Register