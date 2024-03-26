import { useEffect } from "react";
import { 
    RowForm, 
    DivInput, 
    Label, 
    Input, 
    Select,
    DivRadio,
    InputNumber
} from "./style";

const NewHeritage = (props) => {

    const { neutralColor, primaryColor } = props.colors;
    const { chosenItem, setChosenItem, patrimonio } = props.state;

    const dateToday = new Date().toLocaleDateString();

    const setStates = () => {
        setChosenItem({ ...chosenItem, date_registry: dateToday });
        setChosenItem({ ...chosenItem, code: patrimonio.length+11 });
    }

    useEffect(() => {
        setStates();
    }, []);

    return (
        <RowForm>
            <DivInput>
                <Label textcolor={neutralColor}>Código do Item</Label>
                <Input 
                    type="number"
                    value={chosenItem.code}
                    disabled
                    bordercolor={primaryColor}
                    largura={"11rem"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data do Registro</Label>
                <Input 
                    type="date"
                    value={chosenItem.date_registry}
                    onChange={e => setChosenItem({ ...chosenItem, date_registry: e.target.value })}
                    bordercolor={primaryColor}
                    largura={"11rem"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Categoria</Label>
                <Select 
                    largura={"23.5rem"}
                    onChange={e => setChosenItem({ ...chosenItem, category: e.target.value })}
                >
                    <option></option>
                    <option>Energia</option>
                    <option>Contabilidade</option>
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Quantidade</Label>
                <Input 
                    type="number"
                    value={chosenItem.quantity}
                    onChange={e => setChosenItem({ ...chosenItem, quantity: e.target.value })}
                    bordercolor={primaryColor}
                    largura={"8rem"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Unidade de Medida</Label>
                <Input 
                    type="text"
                    placeholder="Prata"
                    bordercolor={primaryColor}
                    largura={"11rem"}
                    value={chosenItem.unit_measurement}
                    onChange={e => setChosenItem({ ...chosenItem, unit_measurement: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Valor</Label>
                <InputNumber 
                    type="number"
                    placeholder="R$ 0,00"
                    bordercolor={primaryColor}
                    largura={"26.5rem"}
                    value={chosenItem.value}
                    onChange={e => setChosenItem({ ...chosenItem, value: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Nome do Item</Label>
                <Input 
                    type="text"
                    placeholder="Nome do item"
                    bordercolor={primaryColor}
                    largura={"23rem"}
                    value={chosenItem.name}
                    onChange={e => setChosenItem({ ...chosenItem, name: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>A compra deste Item foi pago com dinheiro do caixa?</Label>
                <DivRadio>
                    <input name="item" type="radio" />
                    <Label textcolor={"#7d7d7d"}>Sim</Label>
                    <input name="item" type="radio" />
                    <Label textcolor={"#7d7d7d"}>Não</Label>
                </DivRadio>
            </DivInput>
        </RowForm>
    )
}

export default NewHeritage;