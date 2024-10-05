import { DivInput, Form, Input, Label } from "./style"

const FilterDate = (props) => {

    const { primaryColor, neutralColor } = props.colors

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Início</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Fim</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor}
                />
            </DivInput>
        </Form>
    )
}

export default FilterDate