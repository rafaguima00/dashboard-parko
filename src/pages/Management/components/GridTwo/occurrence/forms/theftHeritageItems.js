import { 
    ContainerForm,
    Div,
    Label,
    InputText,
    LabelRadio,
    TextArea
} from "./styleForm";

const TheftHeritage = () => {
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
                        <InputText type="text" placeholder="Furto de itens do patrimônio" value="Furto de itens do patrimônio" disabled />
                    </Div>
                    <Div>
                        <Label>Número da Comanda</Label>
                        <InputText type="text" placeholder="0000" />
                    </Div>
                    <Div>
                        <Label>Registrar a baixa/saída do bem?</Label>
                        <input type="radio" value="Sim" name="ticket" />
                        <LabelRadio>Sim</LabelRadio>
                        <input type="radio" value="Não" name="ticket" />
                        <LabelRadio>Não</LabelRadio>
                    </Div>
                    <Div>
                        <Label>Relate o Ocorrido</Label>
                        <TextArea placeholder="Relatório"></TextArea>
                    </Div>
                </form>
            </ContainerForm>
        </>
    )
}

export default TheftHeritage;