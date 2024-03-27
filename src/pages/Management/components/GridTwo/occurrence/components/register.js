import {  RegisterArea, Item, Text, Icon } from "../style";
import { FiEye } from "react-icons/fi";

const Register = (props) => {

    const { neutralColor, primaryColor, formOccurrence } = props;
    const { selectOccurrence } = props.array;

    return (
        <RegisterArea>
            {selectOccurrence.map(item => (
                <Item>
                    <Text textcolor={neutralColor}>Ocorrência {item.cod}</Text>
                    <Icon onClick={() => formOccurrence(item)} buttoncolor={primaryColor}>
                        <FiEye size={22} color="#fff" />
                    </Icon>
                </Item>
            ))}
        </RegisterArea>
    )
}

export default Register;