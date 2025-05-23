import { theme } from "../../../theme/theme"
import { Form, DivInput, Input, Label } from "./style"

const Retirada = ({ primaryColor, neutralColor, state, messageError }) => {

    const { setNovaRetirada, novaRetirada } = state
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
        
        setNovaRetirada({ ...novaRetirada, value: formatNumber(numericValue) })
    }

    return (
        <Form>
            <DivInput largura={"45%"}>
                <Label textcolor={neutralColor}>Valor (R$)</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={novaRetirada.value}
                    onChange={e => handleChange(e)}
                    required
                />
                <Label textcolor={cancelColor}>{messageError}</Label>
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

export default Retirada