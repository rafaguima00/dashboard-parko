import { Form, DivInput, Input, Label, InputNumber } from "./style";
import { theme } from "../../../theme/theme";

const NewReservation = (props) => {

    const { neutralColor, primaryColor } = theme;
    const { data, setData, vehicles } = props.state;

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>N°</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={vehicles.length+1}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Nome do Cliente</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    largura={360}
                    placeholder="Nome Completo"
                    value={data.name_user}
                    onChange={e => setData({ ...data, name_user: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Contato</Label>
                <InputNumber 
                    type="number"
                    bordercolor={primaryColor} 
                    placeholder="(xx) xxxxx-xxxx"
                    value={data.tel}
                    onChange={e => setData({ ...data, tel: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Modelo</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Modelo do Veículo"
                    largura={245}
                    value={data.name_vehicle}
                    onChange={e => setData({ ...data, name_vehicle: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Cor</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Cor do Veículo"
                    largura={245}
                    value={data.color}
                    onChange={e => setData({ ...data, color: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Placa</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Placa do Veículo"
                    largura={245}
                    value={data.license_plate}
                    onChange={e => setData({ ...data, license_plate: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Entrada</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor} 
                    largura={245}
                    onChange={e => setData({ ...data, data_entrada: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Entrada</Label>
                <Input 
                    type="time" 
                    bordercolor={primaryColor} 
                    largura={245}
                    onChange={e => setData({ ...data, hora_entrada: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Saída</Label>
                <Input 
                    type="time" 
                    bordercolor={primaryColor} 
                    largura={245}
                    onChange={e => setData({ ...data, hora_saida: e.target.value })}
                />
            </DivInput>
        </Form>
    )
}

export default NewReservation;