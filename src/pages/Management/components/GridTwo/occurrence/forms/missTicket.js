import { 
    ContainerForm,
    Div,
    Label,
    InputText,
    LabelRadio,
    DataVehicle,
    TextArea
} from "./styleForm";
import { useState, useEffect } from "react";

const MissTicket = (props) => {

    const [radioValue, setRadioValue] = useState("");

    const { occurrenceItem, setOccurrenceItem } = props.state;

    const handleOnChange = (e) => {
        if(radioValue === "no") {
            return setOccurrenceItem({ ...occurrenceItem, value: 0 })
        }

        setOccurrenceItem({ ...occurrenceItem, value: e.target.value });
    };

    useEffect(() => {
        setOccurrenceItem({ ...occurrenceItem, value: 0 });
    }, []);

    useEffect(() => {
        console.log(occurrenceItem);
    }, [occurrenceItem]);

    return (
        <>
            <ContainerForm>
                <form>
                    <Div>
                        <Label>Local de negócio</Label>
                        <InputText 
                            type="text" 
                            placeholder="Local de negócio" 
                            value={occurrenceItem.local}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, local: e.target.value })}
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Data</Label>
                        <InputText 
                            type="date"
                            value={occurrenceItem.data}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, data: e.target.value })}
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Tipo de ocorrência</Label>
                        <InputText type="text" placeholder="Perda de Ticket" value="Perda de Ticket" disabled />
                    </Div>
                    <Div>
                        <Label>Número da Comanda</Label>
                        <InputText 
                            type="text" 
                            placeholder="0000" 
                            value={occurrenceItem.num_comanda}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, num_comanda: e.target.value })}
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Nome do Cliente</Label>
                        <InputText 
                            type="text" 
                            placeholder="Nome" 
                            value={occurrenceItem.nome_cliente}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, nome_cliente: e.target.value })}
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Veículo</Label>
                        <InputText 
                            type="text" 
                            placeholder="Veículo" 
                            value={occurrenceItem.veiculo}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, veiculo: e.target.value })}
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Data de Entrada</Label>
                        <InputText 
                            type="date" 
                            placeholder="Data" 
                            value={occurrenceItem.data_entrada}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, data_entrada: e.target.value })}
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Hora de Entrada</Label>
                        <InputText 
                            type="time" 
                            placeholder="Hora" 
                            value={occurrenceItem.hora_entrada}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, hora_entrada: e.target.value })}
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Valor a ser pago</Label>
                        <InputText 
                            type="text" 
                            placeholder="R$ 0,00" 
                            value={occurrenceItem.value}
                            onChange={e => handleOnChange(e)}
                            disabled={radioValue === "yes" ? false : true}
                        />
                    </Div>
                    <Div>
                        <Label>Será cobrado valor pela perda do Ticket?</Label>
                        <input 
                            type="radio" 
                            value="yes" 
                            name="ticket" 
                            onClick={e => setRadioValue(e.target.value)}
                        />
                        <LabelRadio>Sim</LabelRadio>
                        <input 
                            type="radio" 
                            value="no" 
                            name="ticket" 
                            onClick={e => setRadioValue(e.target.value)}
                            defaultChecked
                        />
                        <LabelRadio>Não</LabelRadio>
                    </Div>
                    <DataVehicle>Dados de confirmação da posse do veículo</DataVehicle>
                    <Div>
                        <Label>Modelo do Veículo</Label>
                        <InputText 
                            type="text" 
                            placeholder="Modelo do Veículo" 
                            value={occurrenceItem.veiculo}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, veiculo: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Cor do Veículo</Label>
                        <InputText 
                            type="text" 
                            placeholder="Cor do Veículo" 
                            value={occurrenceItem.cor_veiculo}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, cor_veiculo: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Placa</Label>
                        <InputText 
                            type="text" 
                            placeholder="Placa" 
                            value={occurrenceItem.placa_veiculo}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, placa_veiculo: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Número do Documento</Label>
                        <InputText 
                            type="text" 
                            placeholder="Número" 
                            value={occurrenceItem.num_doc}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, num_doc: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Número do RENAVAM</Label>
                        <InputText 
                            type="text" 
                            placeholder="RENAVAM" 
                            value={occurrenceItem.renavam}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, renavam: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Cite um objeto que está dentro do carro</Label>
                        <TextArea 
                            placeholder="Objeto" 
                            value={occurrenceItem.desc_item}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, desc_item: e.target.value })}
                        >
                        </TextArea>
                    </Div>
                </form>
            </ContainerForm>
        </>
    )
}

export default MissTicket;