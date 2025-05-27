import { DivInput, Input, Label } from "../form/style"
import { theme } from "../../../theme/theme"

const FormEditInput = ({ label, ...inputProps }) => {

    const { neutralColor, primaryColor } = theme

    return (
        <DivInput>
            <Label textcolor={neutralColor}>{label}</Label>
            <Input 
                {...inputProps}
                bordercolor={primaryColor}
            />
        </DivInput>
    )
}

export default FormEditInput