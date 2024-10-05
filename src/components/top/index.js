import { Text } from "./style"

const Top = ({ 
    children,
    textcolor,
    font,
    gridrow,
    gridcolumn
}) => {

    const firstWord = children.split(" ")[0]
    const removeFirstWord = children.replace(firstWord, "")

    return (
        <Text 
            textcolor={textcolor}
            font={font}
            gridrow={gridrow}
            gridcolumn={gridcolumn}
        >
            <strong>{firstWord}</strong> {removeFirstWord}
        </Text>
    )
}  

export default Top