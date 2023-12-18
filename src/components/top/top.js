import { Text } from "./style";

const Top = ({ 
    children,
    textcolor,
    font
}) => {

    const firstWord = children.split(" ")[0];
    const removeFirstWord = children.replace(firstWord, "");

    return (
        <Text 
            textcolor={textcolor}
            font={font}
        >
            <strong>{firstWord}</strong> {removeFirstWord}
        </Text>
    )
}  

export default Top;