import {  RegisterArea, Item, Text, Icon } from "../style";
import { FiEye } from "react-icons/fi";

const Register = (props) => {

    const { neutralColor, primaryColor } = props;

    return (
        <RegisterArea>
            <Item>
                <Text textcolor={neutralColor}>Ocorrência TK001</Text>
                <Icon buttoncolor={primaryColor}>
                    <FiEye size={22} color="#fff" />
                </Icon>
            </Item>
            <Item>
                <Text textcolor={neutralColor}>Ocorrência TK001</Text>
                <Icon buttoncolor={primaryColor}>
                    <FiEye size={22} color="#fff" />
                </Icon>
            </Item>
            <Item>
                <Text textcolor={neutralColor}>Ocorrência TK001</Text>
                <Icon buttoncolor={primaryColor}>
                    <FiEye size={22} color="#fff" />
                </Icon>
            </Item>
            <Item>
                <Text textcolor={neutralColor}>Ocorrência TK001</Text>
                <Icon buttoncolor={primaryColor}>
                    <FiEye size={22} color="#fff" />
                </Icon>
            </Item>
        </RegisterArea>
    )
}

export default Register;