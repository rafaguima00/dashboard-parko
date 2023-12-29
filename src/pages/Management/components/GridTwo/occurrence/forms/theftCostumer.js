import { 
    ContainerForm,
    Div,
    Label,
    InputText
} from "./styleForm";

const TheftCostumer = () => {
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
                        <InputText type="text" placeholder="Furto de bens do cliente" value="Furto de bens do cliente" disabled />
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
                        <Label>Bem Furtado</Label>
                        <InputText type="text" placeholder="Bem Furtado" />
                    </Div>
                    <Div>
                        <Label>Número do Boletim de Ocorrência</Label>
                        <InputText type="text" placeholder="N° do Boletim de Ocorrência" />
                    </Div>
                </form>
            </ContainerForm>
        </>
    )
}

export default TheftCostumer;