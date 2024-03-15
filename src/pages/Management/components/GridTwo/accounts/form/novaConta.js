import { 
    RowForm, 
    DivInput, 
    Input, 
    Label, 
    Select, 
    DivCheckbox,
    DivRadio,
    InputNumber
} from "./style";

const NovaConta = (props) => {

    const { primaryColor, neutralColor } = props.colors;
    const { chosenAcc, setChosenAcc, setRadioValue, setCost } = props.state;

    return (
        <RowForm>
            <DivInput>
                <Label textcolor={neutralColor}>Descrição da Conta</Label>
                <Input 
                    type="text"
                    bordercolor={primaryColor}
                    placeholder="Coelba - Jan/2020"
                    largura={"23.5rem"}
                    value={chosenAcc.desc_item}
                    onChange={e => setChosenAcc({ ...chosenAcc, desc_item: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Categoria</Label>
                <Select 
                    largura={"23.5rem"}
                    onChange={e => setChosenAcc({ ...chosenAcc, category: e.target.value })}
                >
                    <option></option>
                    <option>Energia</option>
                    <option>Contabilidade</option>
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Valor</Label>
                <InputNumber 
                    type="number"
                    bordercolor={primaryColor}
                    placeholder="R$ 0,00"
                    largura={"160px"}
                    value={chosenAcc.value}
                    onChange={e => setChosenAcc({ ...chosenAcc, value: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data do Registro</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor}
                    value={chosenAcc.date_created}
                    onChange={e => setChosenAcc({ ...chosenAcc, date_created: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Vencimento</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor}
                    value={chosenAcc.date_payment}
                    onChange={e => setChosenAcc({ ...chosenAcc, date_payment: e.target.value })}
                />
            </DivInput>
            <DivCheckbox>
                <input 
                    type="checkbox"
                />
                <Label textcolor={neutralColor}>Salvar</Label>
            </DivCheckbox>
            <DivInput>
                <Label textcolor={neutralColor}>A conta já foi paga?</Label>
                <DivRadio>
                    <input 
                        name="count" 
                        type="radio" 
                        value="Pago" 
                        onClick={e => setRadioValue(e.target.value)} 
                    />
                    <Label textcolor={"#7d7d7d"}>Sim</Label>
                    <input 
                        name="count" 
                        type="radio" 
                        value="Pendente" 
                        onClick={e => setRadioValue(e.target.value)} 
                    />
                    <Label textcolor={"#7d7d7d"}>Não</Label>
                </DivRadio>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Esta conta foi paga com o dinheiro do caixa?</Label>
                <DivRadio>
                    <input name="cash" type="radio" />
                    <Label textcolor={"#7d7d7d"}>Sim</Label>
                    <input name="cash" type="radio" />
                    <Label textcolor={"#7d7d7d"}>Não</Label>
                </DivRadio>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Esta conta é um custo fixo ou variável?</Label>
                <DivRadio>
                    <input 
                        name="cost" 
                        type="radio" 
                        value="Fixo" 
                        onClick={e => setCost(e.target.value)} 
                    />
                    <Label textcolor={"#7d7d7d"}>Fixo</Label>
                    <input 
                        name="cost" 
                        type="radio" 
                        value="Variável" 
                        onClick={e => setCost(e.target.value)} 
                    />
                    <Label textcolor={"#7d7d7d"}>Variável</Label>
                </DivRadio>
            </DivInput>
        </RowForm>
    )
}

export default NovaConta;