import { DivInput, Form, Input, Label } from "./style"

const FilterDate = (props) => {

    const { primaryColor, neutralColor } = props.colors
    const { setDataTermino, setDataInicio, dataTermino, dataInicio } = props

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Início</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor}
                    onChange={e => setDataInicio(e.target.value)}
                    value={dataInicio}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Fim</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor}
                    onChange={e => setDataTermino(e.target.value)}
                    value={dataTermino}
                />
            </DivInput>
        </Form>
    )
}

export default FilterDate