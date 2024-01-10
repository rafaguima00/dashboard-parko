import { Form, DivInput, Input, Label } from "./style";

const Contribution = ({ primaryColor, neutralColor }) => {
    return (
        <Form>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Valor</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                />
            </DivInput>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Data e hora do aporte</Label>
                <Input 
                    type="datetime-local" 
                    bordercolor={primaryColor} 
                />
            </DivInput>
            <DivInput largura={"100%"}>
                <Label textcolor={neutralColor}>Descrição (obrigatório)</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                />
            </DivInput>
        </Form>
    )
}

export default Contribution;