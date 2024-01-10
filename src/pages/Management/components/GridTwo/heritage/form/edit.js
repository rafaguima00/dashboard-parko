import { 
    RowForm, 
    DivInput, 
    Label, 
    Input, 
    Select,
    DivRadio
} from "./style";

const EditHeritage = (props) => {

    const { chosenItem } = props
    const { neutralColor, primaryColor } = props.colors;

    return (
        <RowForm>
            <DivInput>
                <Label textcolor={neutralColor}>Código do Item</Label>
                <Input 
                    type="text"
                    value={chosenItem.code}
                    disabled
                    bordercolor={primaryColor}
                    largura={"11rem"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data do Registro</Label>
                <Input 
                    type="text"
                    value={chosenItem.dateRegister}
                    disabled
                    bordercolor={primaryColor}
                    largura={"11rem"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Categoria</Label>
                <Select largura={"23.5rem"}>
                    <option>{chosenItem.category}</option>
                    <option>Contabilidade</option>
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Quantidade</Label>
                <Input 
                    type="text"
                    value={chosenItem.quantity}
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
            <DivInput>
                <Label textcolor={neutralColor}>Nome do Item</Label>
                <Input 
                    type="text"
                    value={chosenItem.name}
                    bordercolor={primaryColor}
                    largura={"23rem"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Quantidade final</Label>
                <Input 
                    type="text"
                    placeholder="Quantidade final"
                    bordercolor={primaryColor}
                    largura={"11rem"}
                    value={1}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Valor</Label>
                <Input 
                    type="text"
                    placeholder="R$ 0,00"
                    bordercolor={primaryColor}
                    largura={"11.5rem"}
                    value={chosenItem.valor}
                />
            </DivInput>
        </RowForm>
    )
}

export default EditHeritage;