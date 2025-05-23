import { Form, DivInput, Input, Label, Select } from "./style"
import { theme } from "../../../theme/theme"
import { formatCurrency } from "../../../utils/FormatCurrency"

const DebtPayment = (props) => {

    const { neutralColor, primaryColor } = theme
    const {
        selectedClient, 
        debt,
        valorInput,
        setValorInput,
        valorSelect,
        setValorSelect
    } = props

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
  
    const handleChange = (rawValue) => {
        const numericValue = unformatCurrency(rawValue) / 100
        
        setValorInput(formatNumber(numericValue))
    }

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>Cliente</Label>
                <Input
                    largura={"160px"} 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={selectedClient ?  selectedClient.name : ""}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Dívida Total</Label>
                <Input
                    largura={"240px"} 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={formatCurrency(debt ? debt : "", 'BRL')}
                    disabled

                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Forma de Pagamento</Label>
                <Select 
                    value={valorSelect}
                    largura="300px"
                    onChange={e => setValorSelect(e.target.value)}
                >
                    <option value="credit-card">Maquineta (Crédito)</option>
                    <option value="debit-card">Maquineta (Débito)</option>
                    <option value="money">Dinheiro</option>
                    <option value="pix">Pix</option>
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Valor a receber</Label>
                <Input
                    largura={"100px"} 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="R$ 0,00"
                    value={valorInput ? valorInput : ""}
                    onChange={e => handleChange(e.target.value)}
                />
            </DivInput>
        </Form>
    )
}

export default DebtPayment