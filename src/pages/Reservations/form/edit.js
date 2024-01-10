import { Form, DivInput, Input, Label } from "./style";
import { theme } from "../../../theme/theme";

const EditModal = ({ selectedClient }) => {

    const { neutralColor, primaryColor } = theme;

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
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Contato</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="(xx) xxxxx-xxxx"
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Modelo</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Modelo do Veículo"
                    largura={"245px"}
                    value={selectedClient.vehicle}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Cor</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Cor do Veículo"
                    largura={"245px"}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Placa</Label>
                <Input 
                    type="text" 
                    bordercolor={primaryColor} 
                    placeholder="Placa do Veículo"
                    largura={"245px"}
                    value={selectedClient.licensePlate}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Entrada</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor} 
                    largura={"245px"}
                    value={selectedClient.dateEntry}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Hora de Entrada</Label>
                <Input 
                    type="time" 
                    bordercolor={primaryColor} 
                    largura={"245px"}
                    value={selectedClient.clock}
                />
            </DivInput>
        </Form>
    )
}

export default EditModal;