import { Form, DivInput, Input, Label } from "./style";
import { theme } from "../../../theme/theme";

const EditModal = (props) => {

    const { neutralColor, primaryColor } = theme;
    const { selectedClient, setSelectedClient } = props.states;

    return (
        <Form>
            <DivInput>
                <Label textcolor={neutralColor}>N°</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    value={selectedClient.id}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Nome do Cliente</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    largura={"360px"}
                    placeholder="Nome Completo"
                    value={selectedClient.name}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Contato</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="(xx) xxxxx-xxxx"
                    value={selectedClient.tel}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Modelo</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Modelo do Veículo"
                    largura={"245px"}
                    value={selectedClient.name_vehicle}
                    onChange={e => setSelectedClient({ ...selectedClient, name_vehicle: e.target.value })}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Cor</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Cor do Veículo"
                    largura={"245px"}
                    value={selectedClient.color}
                    onChange={e => setSelectedClient({ ...selectedClient, color: e.target.value })}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Placa</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Placa do Veículo"
                    largura={"245px"}
                    value={selectedClient.license_plate}
                    onChange={e => setSelectedClient({ ...selectedClient, license_plate: e.target.value })}
                    disabled
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Entrada</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor} 
                    largura={"245px"}
                    value={selectedClient.data_entrada}
                    onChange={e => setSelectedClient({ ...selectedClient, data_entrada: e.target.value })}
                    disabled={selectedClient.parko_app == 0 ? true : false}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Entrada</Label>
                <Input 
                    type="time" 
                    bordercolor={primaryColor} 
                    largura={"245px"}
                    value={selectedClient.hora_entrada}
                    onChange={e => setSelectedClient({ ...selectedClient, hora_entrada: e.target.value })}
                    disabled={selectedClient.parko_app == 0 ? true : false}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Saída</Label>
                <Input 
                    type="time" 
                    bordercolor={primaryColor} 
                    largura={"245px"}
                    value={selectedClient.hora_saida}
                    onChange={e => setSelectedClient({ ...selectedClient, hora_saida: e.target.value })}
                />
            </DivInput>
        </Form>
    )
}

export default EditModal;