import { Text } from "./style";

const Top = ({ 
    children,
    textcolor,
    fontsize
}) => {

    const firstWord = children.split(" ")[0];
    const removeFirstWord = children.replace(firstWord, "");

    return (
        <Text 
            textcolor={textcolor}
            fontsize={fontsize}
        >
            <strong>{firstWord}</strong> {removeFirstWord}
        </Text>
    )
}  

export default Top;