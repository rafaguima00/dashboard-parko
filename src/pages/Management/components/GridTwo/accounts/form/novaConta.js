import { 
    RowForm, 
    DivInput, 
    Input, 
    Label, 
    Select, 
    DivCheckbox,
    DivRadio,
    InputNumber
} from "./style"

const NovaConta = (props) => {

    const { primaryColor, neutralColor } = props.colors
    const { chosenAcc, setChosenAcc, setRadioValue, setCost } = props.state

    // Função para formatar o valor com separadores de milhar
    const formatNumber = (num) => {
        if (!num) return ""
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num)
    }
  
    // Função para remover tudo que não for número
    const unformatCurrency = (num) => {
        return num.replace(/[^\d]/g, "").slice(0, 7)
    }

    function handleValue(rawValue) {
        const numericValue = unformatCurrency(rawValue) / 100

        setChosenAcc({ ...chosenAcc, value: formatNumber(numericValue) })
    }

    return (
        <RowForm>
            <DivInput>
                <Label textcolor={neutralColor}>Descrição</Label>
                <Input 
                    type="text"
                    bordercolor={primaryColor}
                    placeholder="Descrição da Conta"
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
                    <option>Aporte</option>
                    <option>Retirada</option>
                    <option>Aluguel do espaço ou terreno</option>
                    <option>Salários fixos da equipe</option>
                    <option>Seguros</option>
                    <option>Licenças e alvarás</option>
                    <option>Serviços de contabilidade e jurídicos</option>
                    <option>Sistemas e softwares de gestão</option>
                    <option>Despesas administrativas</option>
                    <option>Manutenção de Equipamentos</option>
                    <option>Marketing</option>
                    <option>Materiais de Limpeza</option>
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Valor</Label>
                <InputNumber 
                    type="text"
                    bordercolor={primaryColor}
                    placeholder="R$ 0,00"
                    largura={"160px"}
                    value={chosenAcc.value}
                    onChange={e => handleValue(e.target.value)}
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

export default NovaConta