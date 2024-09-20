import { Form, DivInput, Input, Label } from "./style";

const Retirada = ({ primaryColor, neutralColor, state }) => {

    const { setNovaRetirada, novaRetirada } = state;

    return (
        <Form>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Valor (R$)</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={novaRetirada.value}
                    onChange={e => setNovaRetirada({ ...novaRetirada, value: e.target.value })}
                    required
                />
            </DivInput>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Data e hora da retirada</Label>
                <Input 
                    type="datetime-local" 
                    bordercolor={primaryColor} 
                    value={novaRetirada.created_at}
                    onChange={e => setNovaRetirada({ ...novaRetirada, created_at: e.target.value })}
                    required
                />
            </DivInput>
            <DivInput largura={"100%"}>
                <Label textcolor={neutralColor}>Descrição (obrigatório)</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={novaRetirada.description}
                    onChange={e => setNovaRetirada({ ...novaRetirada, description: e.target.value })}
                    required
                />
            </DivInput>
        </Form>
    )
}

export default Retirada;