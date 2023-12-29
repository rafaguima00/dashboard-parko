import { 
    ContainerForm,
    Div,
    Label,
    InputText,
    LabelRadio,
    DataVehicle,
    TextArea
} from "./styleForm";

const MissTicket = () => {
    return (
        <>
            <ContainerForm>
                <form>
                    <Div>
                        <Label>Local de negócio</Label>
                        <InputText type="text" placeholder="Local de negócio" />
                    </Div>
                    <Div>
                        <Label>Data</Label>
                        <InputText type="date" placeholder="xx/xx/xxxx" />
                    </Div>
                    <Div>
                        <Label>Tipo de ocorrência</Label>
                        <InputText type="text" placeholder="Perda de Ticket" value="Perda de Ticket" disabled />
                    </Div>
                    <Div>
                        <Label>Número da Comanda</Label>
                        <InputText type="text" placeholder="0000" />
                    </Div>
                    <Div>
                        <Label>Nome do Cliente</Label>
                        <InputText type="text" placeholder="Nome" />
                    </Div>
                    <Div>
                        <Label>Veículo</Label>
                        <InputText type="text" placeholder="Veículo" />
                    </Div>
                    <Div>
                        <Label>Data de Entrada</Label>
                        <InputText type="text" placeholder="Data" />
                    </Div>
                    <Div>
                        <Label>Hora de Entrada</Label>
                        <InputText type="text" placeholder="Hora" />
                    </Div>
                    <Div>
                        <Label>Valor a ser pago</Label>
                        <InputText type="text" placeholder="R$ 0,00" />
                    </Div>
                    <Div>
                        <Label>Será cobrado valor pela perda do Ticket?</Label>
                        <input type="radio" value="Sim" name="ticket" />
                        <LabelRadio>Sim</LabelRadio>
                        <input type="radio" value="Não" name="ticket" />
                        <LabelRadio>Não</LabelRadio>
                    </Div>
                    <DataVehicle>Dados de confirmação da posse do veículo</DataVehicle>
                    <Div>
                        <Label>Modelo do Veículo</Label>
                        <InputText type="text" placeholder="Modelo do Veículo" />
                    </Div>
                    <Div>
                        <Label>Cor do Veículo</Label>
                        <InputText type="text" placeholder="Cor do Veículo" />
                    </Div>
                    <Div>
                        <Label>Placa</Label>
                        <InputText type="text" placeholder="Placa" />
                    </Div>
                    <Div>
                        <Label>Número do Documento</Label>
                        <InputText type="text" placeholder="Número" />
                    </Div>
                    <Div>
                        <Label>Número do RENAVAM</Label>
                        <InputText type="text" placeholder="RENAVAM" />
                    </Div>
                    <Div>
                        <Label>Cite um objeto que está dentro do carro</Label>
                        <TextArea placeholder="Objeto">

                        </TextArea>
                    </Div>
                </form>
            </ContainerForm>
        </>
    )
}

export default MissTicket;