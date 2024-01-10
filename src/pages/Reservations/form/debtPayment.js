import { Form, DivInput, Input, Label, Select } from "./style";
import { theme } from "../../../theme/theme";
import { formatCurrency } from "../../../services/formatCurrency";
import { useState } from "react";

const DebtPayment = ({ selectedClient, valorAReceber }) => {

    const { neutralColor, primaryColor } = theme;

    const [value, setValue] = useState(valorAReceber);

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
                    value={formatCurrency(selectedClient.debt, 'BRL')}
                    disabled

                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Forma de Pagamento</Label>
                <Select largura={"300px"}>
                    <option value="credit-parko">Crédito Parko</option>
                    <option value="debit">Débito Parko</option>
                    <option value="pix">Pix Parko</option>
                    <option value="credit">Crédito Pessoal</option>
                    <option value="personal">Dívida Pessoal</option>
                    <option value="money">Dinheiro</option>
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

export default DebtPayment;