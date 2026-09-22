import { Container, DivInput, Input, Label } from "./style"

const TextInput = ({
    textColor,
    borderColor,
    borderWidth,
    value,
    setValue,
    placeholder,
    label,
    width,
    required = true,
    type = "text",
    margin
}) => {
    return <>
        <Container>
            <DivInput margin={margin}>
                <Label textcolor={textColor}>{label}</Label>
                <Input 
                    type={type} 
                    borderwidth={borderWidth}
                    bordercolor={borderColor} 
                    placeholder={placeholder}
                    largura={width}
                    value={value}
                    onChange={setValue}
                    required={required}
                />
            </DivInput>
        </Container>
    </>
}

export default TextInput