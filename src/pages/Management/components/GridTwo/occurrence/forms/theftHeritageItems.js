import { useUser } from "../../../../../../context/globalContext"
import { ContainerForm, Div, Label, InputText, LabelRadio, TextArea } from "./styleForm"
import { useState } from "react"

const TheftHeritage = () => {

    const [radioValue, setRadioValue] = useState("")

    const { occurrenceItem, setOccurrenceItem } = useUser()

    return (
        <>
            <ContainerForm>
                <form>
                    <Div>
                        <Label>Local de negócio</Label>
                        <InputText 
                            type="text" 
                            placeholder="Local de negócio" 
                            required
                            value={occurrenceItem.local}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, local: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Data</Label>
                        <InputText 
                            type="date" 
                            placeholder="xx/xx/xxxx" 
                            required
                            value={occurrenceItem.data}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, data: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Tipo de ocorrência</Label>
                        <InputText 
                            type="text" 
                            placeholder="Furto de itens do patrimônio" 
                            value="Furto de itens do patrimônio" 
                            disabled 
                            required
                        />
                    </Div>
                    <Div>
                        <Label>Número da Comanda</Label>
                        <InputText 
                            type="text" 
                            placeholder="0000" 
                            required
                            value={occurrenceItem.num_comanda}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, num_comanda: e.target.value })}
                        />
                    </Div>
                    <Div>
                        <Label>Registrar a baixa/saída do bem?</Label>
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
                            defaultChecked 
                            name="ticket" 
                            onClick={e => setRadioValue(e.target.value)} 
                        />
                        <LabelRadio>Não</LabelRadio>
                    </Div>
                    <Div>
                        <Label>Relate o Ocorrido</Label>
                        <TextArea 
                            placeholder="Relatório" 
                            required
                            value={occurrenceItem.bem_furtado}
                            onChange={e => setOccurrenceItem({ ...occurrenceItem, bem_furtado: e.target.value })}
                        >

                        </TextArea>
                    </Div>
                </form>
            </ContainerForm>
        </>
    )
}

export default TheftHeritage