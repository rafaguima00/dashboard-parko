import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import {
    Content,
    List,
    Edit,
    SecondSection,
    TextOption,
    Payment,
    Select,
    Price,
    Add,
    Receive,
    MessageError,
    DivError,
    ArrayElement,
    DivPayment
} from "../style"
import { formatCurrency } from "../../../services/formatCurrency"
import { theme } from "../../../theme/theme"
import Modal from "../../../components/Modal"
import EditModal from "../form/edit"
import DebtPayment from "../form/debtPayment"
import api from "../../../services/api/server"
import { unformatCurrency } from "../../../services/unformatCurrency"
import InformacoesReserva from "./informacoesReserva"

const SelectedReserve = (props) => {

    const { 
        valuesDebt, 
        reservaAberta, 
        hasDebt,
        setValueSelectDebt,
        error,
        messageError,
        total,
        valorDaReservaAtual,
        diferenca,
        linhas, 
        setLinhas,
        dateTime,
        setDateTime
    } = props.state
    const { cancelColor } = theme
    const { selectedClient, setSelectedClient } = useUser()

    const [openEdit, setOpenEdit] = useState(false)
    const [openDebt, setOpenDebt] = useState(false)
    const [loading, setLoading] = useState(false)
    const [trocoCliente, setTrocoCliente] = useState(0)
    const [status, setStatus] = useState(0)

    const reservaParko = selectedClient?.parkoapp ?? ""

    const optionMoney = linhas.filter(item => item.valueSelect === "money")
    const valores = linhas.map(item => {
        return unformatCurrency(item.valorPgto)/100
    })
    const somarValores = valores.reduce((prev, current) => {
        return prev + current
    })

    const handleUpdate = async (id, e) => {
        e.preventDefault()
        setLoading(true)

        // Constante para gravar a data e hora da saída
        const converter = new Date(dateTime)
        const date = converter.getDate()
        const month = converter.getMonth()+1
        const year = converter.getFullYear()
        const hour = converter.getHours()
        const minute = converter.getMinutes()
    
        const converterHora = (hour<10 ? "0"+hour : hour) + ":" + (minute<10 ? "0"+minute : minute)
        const converterData = (year) + "-" + (month<10 ? "0"+month : month) + "-" + (date<10 ? "0"+date : date)

        await api.put(`reservations/${id}`, {
            data_entrada: selectedClient.data_entrada,
            hora_entrada: selectedClient.hora_entrada,
            data_saida: converterData,
            hora_saida: converterHora,
            value: valorDaReservaAtual,
            status: status,
            id_vehicle: selectedClient.id_vehicle
        })
        .then(() => {
            alert("Reserva atualizada com sucesso.")
            setSelectedClient({ ...selectedClient, hora_saida: converterHora })
            setLoading(false)
            setDateTime("")
            setOpenEdit(false)
        })
        .catch(e => {
            setLoading(false)
            console.log(e)
        })
    }

    const addLine = e => {
        e.preventDefault()
        setLinhas([...linhas, { valorPgto: "", valueSelect: "credit-parko" }])
    }

    const troco = (index) => {
        const { valorPgto, valueSelect } = linhas[index]

        if ((somarValores > unformatCurrency(total)/100) && optionMoney.length > 0) {
            setTrocoCliente(somarValores - (unformatCurrency(total)/100))
        }

        if (valueSelect !== "money" || valorPgto < 0) {
            setLinhas(linhas.map((linha, i) =>
                i === index ? { ...linha, trocoCliente: 0 } : linha
            ))
        }
    }

    // Função para formatar o valor com separadores de milhar
    const formatNumber = (num) => {
        if (!num) return "R$ 0,00"
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num)
    }
  
    const handleChange = (e, index) => {
        const rawValue = e.target.value
        if(rawValue === "") return  

        const numericValue = unformatCurrency(rawValue) / 100
        setLinhas(linhas.map((linha, i) =>
            i === index ? { ...linha, valorPgto: formatNumber(numericValue) } : linha
        ))
    }

    const handleSelectChange = (e, index) => {
        const value = e.target.value
        setLinhas(linhas.map((linha, i) =>
            i === index ? { ...linha, valueSelect: value } : linha
        ))
    }

    const alterarLinhas = () => {

        const optionMoney = linhas.filter(item => item.valueSelect === "money")

        if(optionMoney.length > 0 && (somarValores > unformatCurrency(total)/100)) {
            return setTrocoCliente(somarValores - (unformatCurrency(total)/100))
        }

        return setTrocoCliente(0)

    }

    const renderItem = () => {
        return linhas.map((linha, index) => (
            <ArrayElement key={index}>
                <Select 
                    value={linha.valueSelect} 
                    disabled={reservaParko === 1 ? true : false} 
                    onChange={e => handleSelectChange(e, index)}
                >
                    <option value="credit-card">Cartão de Crédito</option>
                    <option value="debit-card">Cartão de Débito</option>
                    <option value="debit">A ser pago</option>
                    <option value="money">Dinheiro</option>
                    <option value="pix">Pix</option>
                </Select>
                <Price 
                    type="text"
                    placeholder="Valor (R$)"
                    value={linha.valorPgto ? linha.valorPgto : formatNumber(0)}
                    onChange={e => handleChange(e, index)}
                    onBlur={() => troco(index)}
                />
            </ArrayElement>
        ))
    }

    useEffect(() => {
        if(reservaAberta) {
            const indexOf = reservaAberta.values().next().value
            setSelectedClient(indexOf)
        }
    }, [])

    useEffect(() => {
        if(trocoCliente < 0) {
            setTrocoCliente(0)
        }
    }, [trocoCliente])

    useEffect(() => {
        alterarLinhas()
    }, [linhas])

    return (
        <Content>
            <List padding={"2.4rem 4rem"}>
                {/* Primeira coluna (informações da reserva) */}
                <section>
                    <InformacoesReserva selectedClient={selectedClient} />

                    {/* Editar hora de saída da reserva */}
                    <Edit onClick={() => setOpenEdit(true)}>Editar</Edit>
                    <Modal
                        isOpen={openEdit}
                        setOpen={setOpenEdit}
                        title={selectedClient ? `Nº ${selectedClient.id}` : ""}
                        maxWidth={"52rem"}
                        funcao={e => handleUpdate(selectedClient.id, e)} 
                        isLoading={loading}
                    >
                        <EditModal 
                            states={{ 
                                selectedClient,
                                setSelectedClient,
                                setStatus,
                                dateTime,
                                setDateTime
                            }} 
                        />
                    </Modal>
                </section>

                {/* Segunda coluna (informações de pagamento) */}
                <SecondSection>
                    {hasDebt === true &&
                        <div>
                            {/* 1ª linha: Valor da dívida + input + select */}
                            <TextOption>
                                Dívida Total {"\n"}
                                <strong style={{ color: cancelColor }}>
                                    {formatCurrency(valuesDebt, 'BRL')}
                                </strong>
                            </TextOption>
                            <Payment>
                                <Select 
                                    defaultValue="credit-card" 
                                    onChange={e => setValueSelectDebt(e.target.value)}
                                    disabled={reservaParko === 1 ? true : false} 
                                >
                                    <option value="credit-card">Cartão de Crédito</option>
                                    <option value="debit-card">Cartão de Débito</option>
                                    <option value="debit">A ser pago</option>
                                    <option value="money">Dinheiro</option>
                                    <option value="pix">Pix</option>
                                </Select>
                                <Price 
                                    type="text" 
                                    placeholder="Valor (R$)" 
                                    value={formatCurrency(valuesDebt, 'BRL')}
                                />
                                <Add
                                    onClick={() => setOpenDebt(true)}
                                >
                                    +
                                </Add>
                                <Modal
                                    isOpen={openDebt}
                                    setOpen={setOpenDebt}
                                    title={"Pagamento de Dívida"}
                                    maxWidth={"30rem"}
                                >
                                    <DebtPayment selectedClient={selectedClient} debt={valuesDebt} />
                                </Modal>
                            </Payment>
                        </div>
                    }
                    <div>
                        {/* 2ª linha: Valor da reserva + dívida a receber (se tiver) + input + select */}
                        <Receive>
                            <TextOption>
                                Valor a receber {"\n"}
                                <strong>
                                    {formatCurrency(diferenca < 0 ? 0 : valorDaReservaAtual, 'BRL')}
                                </strong>
                            </TextOption>
                            {hasDebt === true &&
                                <TextOption>
                                    {/* Valor da dívida */}
                                    Dívida a receber {"\n"}
                                    <strong style={{ color: cancelColor }}>
                                        {formatCurrency(valuesDebt, 'BRL')}
                                    </strong>
                                </TextOption>
                            }
                        </Receive>
                        <Payment>
                            <DivPayment>
                                {renderItem()}
                            </DivPayment>
                            <Add onClick={addLine}>+</Add>
                        </Payment>
                        {error === true && 
                            <DivError>
                                <MessageError>{messageError}</MessageError>
                            </DivError>
                        }
                    </div>

                    {/* Valor da reserva + valor da dívida */}
                    <TextOption>
                        Valor total {"\n"}
                        <strong>
                            {total ? formatCurrency(total, 'BRL') : formatCurrency(0, 'BRL')}
                        </strong>
                    </TextOption>
                    
                    {/* Troco do cliente caso pague em dinheiro */}
                    <TextOption>
                        Troco {"\n"}
                        <strong>
                            {formatNumber(trocoCliente)}
                        </strong>
                    </TextOption>
                </SecondSection>
            </List>
        </Content>
    )
}

export default SelectedReserve