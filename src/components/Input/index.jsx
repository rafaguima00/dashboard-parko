import { Container, DivInput, Input, Label } from "./style"

const TextInput = ({
    textColor,
    borderColor,
    value,
    setValue,
    placeholder,
    label,
    width,
    required = true
}) => {

    return <>
        <Container>
            <DivInput>
                <Label textcolor={textColor}>{label}</Label>
                <Input 
                    type="text" 
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