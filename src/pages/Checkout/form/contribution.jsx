import { Form, DivInput, Input, Label, InputNumber } from "./style"
import { theme } from "../../../theme/theme"

const Contribution = ({ primaryColor, neutralColor, state, messageError }) => {

    const { novoAporte, setNovoAporte } = state
    const { cancelColor } = theme

    const formatNumber = (num) => {
        if (!num) return ""
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num)
    }
  
    const unformatCurrency = (num) => {
        return num.replace(/[^\d]/g, "").slice(0, 6)
    }
  
    const handleChange = (e) => {
        const rawValue = e.target.value
        const numericValue = unformatCurrency(rawValue) / 100
        
        setNovoAporte({ ...novoAporte, value: formatNumber(numericValue) })
    }

    return (
        <Form>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Valor (R$)</Label>
                <InputNumber 
                    type="text"
                    bordercolor={primaryColor} 
                    value={novoAporte.value}
                    onChange={e => handleChange(e)}
                    required
                />
                <Label textcolor={cancelColor}>{messageError}</Label>
            </DivInput>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Data e hora do aporte</Label>
                <Input 
                    type="datetime-local" 
                    bordercolor={primaryColor} 
                    value={novoAporte.created_at}
                    onChange={e => setNovoAporte({ ...novoAporte, created_at: e.target.value })}
                    required
                />
            </DivInput>
            <DivInput largura={"100%"}>
                <Label textcolor={neutralColor}>Descrição (obrigatório)</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={novoAporte.description}
                    onChange={e => setNovoAporte({ ...novoAporte, description: e.target.value })}
                    required
                />
            </DivInput>
        </Form>
    )
}

export default Contribution