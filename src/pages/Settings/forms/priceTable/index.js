import { ContainerForm, DivButton } from "../style"
import TopForm from "../../components/topForm"
import { 
    Form, 
    Label,
    Row,
    InputArea,
    Column,
    Block,
    InputNumber,
    HoraFracao,
    Header,
    Table,
    Body,
    RowTable,
    Square,
    Add,
    ColumnTable
} from "./style"
import { theme } from "../../../../theme/theme"
import GlobalButton from "../../../../components/Button"
import { useUser } from "../../../../context/globalContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../../../services/api/server"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../../../services/readData"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"

const PriceTableForm = () => {

    const { primaryColor, cancelColor, greenColor } = theme
    const { 
        listColaborators, 
        listReservations, 
        loadData, 
        getPriceTable,
        getTabelaFixa
    } = ReadApi()
    const { 
        dataClient, 
        priceTable, 
        setDataClient, 
        reservations,
        tabelaFixa
    } = useUser()

    const navigate = useNavigate()

    const screenBack = () => {
        return navigate("/settings")
    }

    const [value, setValue] = useState("yes")
    const [typeCharge, setTypeCharge] = useState("tabela-fixa")
    const [loading, setLoading] = useState(false)
    const [linhas, setLinhas] = useState([
        { 
            id: null, 
            idEstacionamento: null,
            valueNumber: "", 
            valueTime: "", 
            valueTimeTwo: "" 
        }
    ])
    const [formTable, setFormTable] = useState({})

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const changeTypeCharge = e => {
        setTypeCharge(e.target.value)
    }

    const onSave = async (e) => {
        e.preventDefault()
        setLoading(true)

        if(!priceTable.id_estacionamento) {

            await api.post("/tabela_preco", { 
                id_estacionamento: dataClient.id_establishment, 
                tempo_tolerancia: formTable.tempo_tolerancia, 
                valor_hora: unformatCurrency(formTable.valor_hora)/100, 
                valor_fracao_hora: formTable.valor_fracao_hora
            })
            .then(() => {
                alert("Valores salvos com sucesso.")
                screenBack()
            })
            .catch(e => {
                console.log(e)
            })

        } else {

            await api.put(`/tabela_preco/${dataClient.id_establishment}`, formTable)
            .then(() => {
                alert("Informações atualizadas")
            })
            .catch(e => {
                console.log(e)
            }) 

        }
        
        // Verificar se há linhas novas ainda não inseridas no banco de dados
        const filterLines = linhas.filter(item => item.id == null)
        if(filterLines.length > 0) {
            await api.post("/tabela_fixa", {
                id_establishment: filterLines.idEstacionamento,
                primeira_hora: filterLines.valueTime, 
                segunda_hora: filterLines.valueTimeTwo, 
                value: filterLines.valueNumber
            })
            .then(() => {
                console.log("criado")
            })
            .catch(e => {
                console.log(e)
            })
        }

        // Verificar linhas já existentes no banco de dados
        const itemExists = linhas.filter(item => item.id != null)
        if(itemExists.length > 0) {
            await api.put(`/tabela_fixa/${dataClient.id_establishment}`, { 
                primeira_hora: itemExists.valueTime, 
                segunda_hora: itemExists.valueTimeTwo, 
                value: itemExists.valueNumber
            })
            .then(() => {
                console.log("atualizado")
            })
            .catch(e => {
                console.log(e)
            })
        }
        
        setLoading(false)
        return
    }

    // Função para formatar o valor com separadores de milhar
    const formatNumber = (num) => {
        if (!num) return ""
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num)
    }
  
    // Função para remover tudo que não for número
    const unformatCurrency = (num) => {
        return num.replace(/[^\d]/g, "")
    }
  
    const handleChange = (e, index) => {
        const rawValue = e.target.value
        const numericValue = unformatCurrency(rawValue) / 100
        
        setLinhas(linhas.map((item, i) => (
            i === index ? { ...item, valueNumber: formatNumber(numericValue) } : item
        )))
    }

    const handleValorHora = e => {
        const rawValue = e.target.value
        const numericValue = unformatCurrency(rawValue) / 100
        setFormTable({ ...formTable, valor_hora: formatNumber(numericValue) })
    }
    
    // Função para formatar a entrada como hora (HH:MM)
    const formatTime = (value) => {
        const rawValue = value.replace(/\D/g, "") // Remove tudo que não for número

        if (rawValue.length <= 2) {
            return rawValue // Exibe os primeiros dois dígitos como hora, sem formatação
        }

        let hour = rawValue.slice(0, 2) // Pega os dois primeiros dígitos como hora
        let minute = rawValue.slice(2, 4) // Pega os dois últimos como minutos

        // Limita a hora a um máximo de 23
        if (hour > 23) hour = "23"

        // Limita os minutos a um máximo de 59
        if (minute > 59) minute = "59"

        return `${hour}:${minute}`
    }

    const handleChangeTime = (e, index) => {
        const inputValue = e.target.value
        const formattedValue = formatTime(inputValue)
        
        setLinhas(linhas.map((item, i) => (
            i === index ? { ...item, valueTime: formattedValue } : item
        )))
    }

    const handleChangeTimeTwo = (e, index) => {
        const inputValue = e.target.value
        const formattedValue = formatTime(inputValue)
        
        setLinhas(linhas.map((item, i) => (
            i === index ? { ...item, valueTimeTwo: formattedValue } : item
        )))
    }

    const renderItem = () => {
        return linhas.map((item, index) => (
            <RowTable key={item.id}>
                <Square
                    type="text"
                    value={item.valueTime}
                    onChange={e => handleChangeTime(e, index)}
                    maxLength={5} 
                    placeholder="00:00h"
                />
                <Square
                    type="text"
                    value={item.valueTimeTwo}
                    onChange={e => handleChangeTimeTwo(e, index)}
                    maxLength={5} 
                    placeholder="00:00h"
                />
                <Square
                    type="text"
                    value={item.valueNumber}
                    onChange={e => handleChange(e, index)}
                    placeholder="R$"
                />
            </RowTable>
        ))
    }

    const addLine = async (e) => {
        e.preventDefault()
        setLinhas([...linhas, { 
            id: null, 
            idEstacionamento: null,
            valueNumber: "", 
            valueTime: "", 
            valueTimeTwo: ""  
        }])
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        }

        setFormTable({
            id: priceTable.id,
            id_estacionamento: dataClient.id_establishment,
            tempo_tolerancia: priceTable.tempo_tolerancia,
            valor_fracao_hora: priceTable.valor_fracao_hora,
            valor_hora: priceTable.valor_hora,
        })
        getTabelaFixa(dataClient.id_establishment)
    }, [])

    useEffect(() => {
        if (tabelaFixa.length > 0) {
            const novasLinhas = tabelaFixa.map((item) => ({
                id: item.id, 
                idEstacionamento: item.id_establishment,
                valueNumber: formatNumber(item.value),
                valueTime: item.primeira_hora,
                valueTimeTwo: item.segunda_hora,
            }));
            setLinhas(novasLinhas)
        }
        console.log(tabelaFixa)
        console.log(linhas)
    }, [tabelaFixa])

    useEffect(() => {
        getPriceTable(dataClient.id_establishment)
    }, [priceTable])

    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)
        listReservations(dataClient.id_establishment)
    }, [dataClient, reservations])

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
                                    checked={value === "yes" ? true : false}
                                />
                                <Label font={14} textcolor={"#7d7d7d"}>Sim</Label>
                            </div>
                            <div>
                                <input 
                                    type="radio"
                                    name="tolerance"
                                    value="no"
                                    onChange={handleOnChange}
                                    checked={value === "no" ? true : false}
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
                                value={formTable.tempo_tolerancia}
                                onChange={e => setFormTable({ ...formTable, tempo_tolerancia: e.target.value })}
                            />
                        </InputArea>
                    </Row>
                    <Column>
                        <Label bold>Selecione o tipo de cobrança:</Label>
                        <InputArea>
                            <div>
                                <input 
                                    type="radio"
                                    name="charge"
                                    value="hora-fracao"
                                    onChange={changeTypeCharge}
                                    checked={typeCharge === "hora-fracao" ? true : false}
                                />
                                <Label font={14} textcolor={"#7d7d7d"}>Hora e fração da hora</Label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    name="charge" 
                                    value="tabela-fixa"
                                    onChange={changeTypeCharge} 
                                    checked={typeCharge === "tabela-fixa" ? true : false}
                                />
                                <Label font={14} textcolor={"#7d7d7d"}>Tabela fixa</Label>
                            </div>
                        </InputArea>
                    </Column>
                    {typeCharge === "hora-fracao" ? 
                        <HoraFracao>
                            <Row>
                                <Label>Qual o valor da fração da hora em seu estabelecimento?</Label>
                                <InputArea> 
                                    <InputNumber 
                                        bordercolor={primaryColor} 
                                        type="text" 
                                        placeholder="R$ 0,00"
                                        value={formTable.valor_fracao_hora}
                                        onChange={e => setFormTable({ ...formTable, valor_fracao_hora: e.target.value })}
                                    />
                                </InputArea>
                            </Row>
                            <Row>
                                <Label>Qual o valor da hora em seu estabelecimento?</Label>
                                <InputArea>
                                    <InputNumber 
                                        bordercolor={primaryColor} 
                                        type="text" 
                                        placeholder="R$ 0,00"
                                        value={formTable.valor_hora}
                                        onChange={handleValorHora}
                                    />
                                </InputArea>
                            </Row>
                        </HoraFracao> :
                        <Table>
                            <Header>
                                <p>De</p>
                                <p>Até</p>
                                <p>Valor</p>
                            </Header>
                            <Body>
                                <ColumnTable>
                                    {renderItem()}
                                </ColumnTable>
                                <Add onClick={addLine}>+</Add>
                            </Body>
                        </Table>
                    }
                    <DivButton marg={"3rem"}>
                        <GlobalButton 
                            children="Cancelar"
                            background={cancelColor}
                            largura={"12rem"}
                            altura={"2.8rem"}
                            aoPressionar={screenBack}
                        />
                        <GlobalButton 
                            children={
                                loading ? 
                                <Bounce color="#f4f4f4" /> : 
                                "Salvar"
                            }
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

export default PriceTableForm