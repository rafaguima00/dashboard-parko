import { ContainerForm, DivButton } from "../style";
import TopForm from "../../components/topForm";
import { 
    Form, 
    Label,
    Row,
    InputArea,
    Column,
    Block,
    InputNumber
} from "./style";
import { theme } from "../../../../theme/theme";
import GlobalButton from "../../../../components/Button";
import { useUser } from "../../../../context/globalContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../services/api/server";
import { jwtDecode } from "jwt-decode";
import ReadApi from "../../../../services/readData";

const PriceTableForm = () => {

    const { primaryColor, cancelColor, greenColor } = theme;
    const { listColaborators, listReservations, loadData, getPriceTable } = ReadApi();
    const { 
        dataClient, 
        priceTable, 
        setPriceTable,
        setDataClient, 
        reservations 
    } = useUser();

    const navigate = useNavigate();

    const screenBack = () => {
        return navigate("/settings");
    };

    const [value, setValue] = useState("");

    const handleOnChange = (e) => {
        setValue(e.target.value);
    };

    const onSave = async () => {

        if(!priceTable.id_estacionamento) {

            await api.post("/tabela_preco", { 
                id_estacionamento: dataClient.id_establishment, 
                tempo_tolerancia: priceTable.tempo_tolerancia, 
                valor_hora: priceTable.valor_hora, 
                valor_fracao_hora: priceTable.valor_fracao_hora
            })
            .then(() => {
                alert("Valores salvos com sucesso.");
                screenBack();
            })
            .catch(e => {
                console.log(e);
            })

        } else {

            await api.put(`/tabela_preco/${dataClient.id_establishment}`, priceTable)
            .then(() => {
                alert("Informações atualizadas");
            })
            .catch(e => {
                console.log(e);
            }) 

        }
    };

    useEffect(() => {
        getPriceTable(dataClient.id_establishment);
        if(priceTable.tempo_tolerancia) {
            setValue("yes")
        }
    }, [priceTable]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            const decoded = jwtDecode(token);
            setDataClient(decoded.user)
        }
    }, []);

    useEffect(() => {
        loadData(dataClient.id_establishment);
        listColaborators(dataClient.id_establishment);
        listReservations(dataClient.id_establishment);
    }, [dataClient, reservations]);

    return (
        <ContainerForm>
            <TopForm children="Tabela de Preços" />
            <Block>
                <Form>
                    <Row>
                        <Label>Há tempo de tolerância em seu estabelecimento?</Label>
                        <InputArea>
                            <div>
                                <input 
                                    type="radio" 
                                    name="tolerance" 
                                    value="yes" 
                                    onChange={handleOnChange}
                                />
                                <Label font={14} textcolor={"#7d7d7d"}>Sim</Label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    name="tolerance" 
                                    value="no" 
                                    onChange={handleOnChange}
                                />
                                <Label font={14} textcolor={"#7d7d7d"}>Não</Label>
                            </div>
                        </InputArea>
                    </Row>
                    <Row>
                        <Label>Qual o tempo de tolerância do seu estabelecimento? (minutos)</Label>
                        <InputArea>
                            <InputNumber 
                                bordercolor={primaryColor} 
                                type="number" 
                                placeholder="00:10" 
                                disabled={value === "yes" ? false : true}
                                value={priceTable.tempo_tolerancia}
                                onChange={e => setPriceTable({ ...priceTable, tempo_tolerancia: e.target.value })}
                            />
                        </InputArea>
                    </Row>
                    <Column>
                        <Label bold>Selecione o tipo de cobrança:</Label>
                        <InputArea>
                            <div>
                                <input type="radio" name="charge" checked disabled/>
                                <Label font={14} textcolor={"#7d7d7d"}>Hora e fração da hora</Label>
                            </div>
                            <div>
                                <input type="radio" name="charge" disabled/>
                                <Label font={14} textcolor={"#7d7d7d"}>Tabela fixa</Label>
                            </div>
                        </InputArea>
                    </Column>
                    <Row>
                        <Label>Qual o valor da fração da hora em seu estabelecimento?</Label>
                        <InputArea> 
                            <InputNumber 
                                bordercolor={primaryColor} 
                                type="number" 
                                placeholder="R$ 0,00"
                                value={priceTable.valor_fracao_hora}
                                onChange={e => setPriceTable({ ...priceTable, valor_fracao_hora: e.target.value })}
                            />
                        </InputArea>
                    </Row>
                    <Row>
                        <Label>Qual o valor da hora em seu estabelecimento?</Label>
                        <InputArea>
                            <InputNumber 
                                bordercolor={primaryColor} 
                                type="number" 
                                placeholder="R$ 0,00"
                                value={priceTable.valor_hora}
                                onChange={e => setPriceTable({ ...priceTable, valor_hora: e.target.value })}
                            />
                        </InputArea>
                    </Row>
                    <DivButton marg={"3rem"}>
                        <GlobalButton 
                            children="Cancelar"
                            background={cancelColor}
                            largura={"12rem"}
                            altura={"2.8rem"}
                            aoPressionar={screenBack}
                        />
                        <GlobalButton 
                            children="Salvar"
                            background={greenColor}
                            largura={"12rem"}
                            altura={"2.8rem"}
                            aoPressionar={onSave}
                        />
                    </DivButton>
                </Form>
            </Block>
        </ContainerForm>
    )
}

export default PriceTableForm;