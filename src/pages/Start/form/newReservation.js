import { Form, DivInput, Input, Label, InputNumber } from "./style"
import { theme } from "../../../theme/theme"
import { converter } from "../../../services/converterData"

const NewReservation = (props) => {

    const { neutralColor, primaryColor } = theme
    const { data, setData, reservations } = props.state
    const { converterData } = converter()

    function formatTel(value) {
        const rawValue = value.replace(/\D/g, '').slice(0, 11)

        let formattedPhone = rawValue

        if (rawValue.length > 7) {
            formattedPhone = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7)}`
        }

        setData({ ...data, tel: formattedPhone })
    }

    function formatPlaca(value) {
        const rawValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)

        let formattedPlate = rawValue

        if (rawValue.length >= 4) {
            formattedPlate = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
        }

        setData({ ...data, license_plate: formattedPlate })
    }

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>N°</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={reservations.length+1}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Nome do Cliente *</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    largura={360}
                    placeholder="Nome Completo"
                    value={data.name_user}
                    onChange={e => setData({ ...data, name_user: e.target.value })}
                    required
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Contato *</Label>
                <InputNumber 
                    type="text"
                    bordercolor={primaryColor} 
                    placeholder="(xx) xxxxx-xxxx"
                    largura={219}
                    value={data.tel}
                    onChange={e => formatTel(e.target.value)}
                    required
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Modelo *</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Modelo do Veículo"
                    largura={245}
                    value={data.name_vehicle}
                    onChange={e => setData({ ...data, name_vehicle: e.target.value })}
                    required
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Cor *</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Cor do Veículo"
                    largura={245}
                    value={data.color}
                    onChange={e => setData({ ...data, color: e.target.value })}
                    required
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Placa *</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Placa do Veículo"
                    largura={245}
                    value={data.license_plate}
                    onChange={e => formatPlaca(e.target.value)}
                    required
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Entrada *</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor} 
                    largura={245}
                    onChange={e => setData({ ...data, data_entrada: e.target.value })}
                    min={converterData}
                    required
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Entrada *</Label>
                <Input
                    type="time"
                    bordercolor={primaryColor}
                    largura={245}
                    onChange={e => setData({ ...data, hora_entrada: e.target.value })}
                    required
                />
            </DivInput>
        </Form>
    )
}

export default NewReservation