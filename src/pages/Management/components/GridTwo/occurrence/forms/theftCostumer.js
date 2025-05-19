import { useUser } from "../../../../../../context/globalContext"
import { ContainerForm, Div, Label, InputText } from "./styleForm"

const TheftCostumer = (props) => {
    
    const { occurrenceItem, setOccurrenceItem } = useUser()
    const { onBlur } = props

    return <>
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
                        placeholder="xx/xx/xxxx" 
                        value={occurrenceItem.data}
                        onChange={e => setOccurrenceItem({ ...occurrenceItem, data: e.target.value })}
                        required
                    />
                </Div>
                <Div>
                    <Label>Tipo de ocorrência</Label>
                    <InputText 
                        type="text" 
                        placeholder="Furto de bens do cliente" 
                        value="Furto de bens do cliente" 
                        disabled 
                    />
                </Div>
                <Div>
                    <Label>Número da Comanda</Label>
                    <InputText 
                        type="text" 
                        placeholder="0000" 
                        value={occurrenceItem.num_comanda}
                        onChange={e => setOccurrenceItem({ ...occurrenceItem, num_comanda: e.target.value })}
                        onBlur={e => onBlur(e.target.value)}
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
                    <Label>Bem Furtado</Label>
                    <InputText 
                        type="text" 
                        placeholder="Bem Furtado" 
                        value={occurrenceItem.bem_furtado}
                        onChange={e => setOccurrenceItem({ ...occurrenceItem, bem_furtado: e.target.value })}
                        required
                    />
                </Div>
                <Div>
                    <Label>Número do Boletim de Ocorrência</Label>
                    <InputText 
                        type="text" 
                        placeholder="N° do Boletim de Ocorrência" 
                        value={occurrenceItem.num_bo}
                        onChange={e => setOccurrenceItem({ ...occurrenceItem, num_bo: e.target.value })}
                        required
                    />
                </Div>
            </form>
        </ContainerForm>
    </>
}

export default TheftCostumer