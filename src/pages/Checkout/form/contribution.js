import { Form, DivInput, Input, Label, InputNumber } from "./style";

const Contribution = ({ primaryColor, neutralColor, state }) => {

    const { novoAporte, setNovoAporte } = state;

    return (
        <Form>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Valor</Label>
                <InputNumber 
                    type="number" 
                    bordercolor={primaryColor} 
                    value={novoAporte.value}
                    onChange={e => setNovoAporte({ ...novoAporte, value: e.target.value })}
                />
            </DivInput>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Data e hora do aporte</Label>
                <Input 
                    type="datetime-local" 
                    bordercolor={primaryColor} 
                    value={novoAporte.created_at}
                    onChange={e => setNovoAporte({ ...novoAporte, created_at: e.target.value })}
                />
            </DivInput>
            <DivInput largura={"100%"}>
                <Label textcolor={neutralColor}>Descrição (obrigatório)</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={novoAporte.description}
                    onChange={e => setNovoAporte({ ...novoAporte, description: e.target.value })}
                />
            </DivInput>
        </Form>
    )
}

export default Contribution;