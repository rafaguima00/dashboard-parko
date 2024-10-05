import { Form, DivInput, Input, Label, Select } from "./style"
import { theme } from "../../../theme/theme"
import { formatCurrency } from "../../../services/formatCurrency"
import { useState } from "react"

const DebtPayment = ({ selectedClient, debt }) => {

    const { neutralColor, primaryColor } = theme

    const [value, setValue] = useState(debt)

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>Cliente</Label>
                <Input
                    largura={"160px"} 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={selectedClient.name}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Dívida Total</Label>
                <Input
                    largura={"240px"} 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={formatCurrency(value, 'BRL')}
                    disabled

                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Forma de Pagamento</Label>
                <Select 
                    defaultValue="credit-card" 
                    largura="300px"
                    // onChange={e => setValueSelectDebt(e.target.value)}
                    // disabled={reservaParko === 1 ? true : false} 
                >
                    <option value="credit-card">Cartão de Crédito</option>
                    <option value="debit-card">Cartão de Débito</option>
                    <option value="debit">A ser pago</option>
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
                    value={formatCurrency(value, 'BRL')}
                    onChange={e => setValue(e.target.value)}
                />
            </DivInput>
        </Form>
    )
}

export default DebtPayment