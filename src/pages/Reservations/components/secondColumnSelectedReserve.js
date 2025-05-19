import React, { useEffect, useState } from "react"
import { 
    Add,
    ArrayElement,
    DivError,
    DivPayment,
    MessageError,
    Payment, 
    Price, 
    Receive, 
    SecondSection, 
    Select
} from "../style"
import { formatCurrency } from "../../../services/formatCurrency"
import { theme } from "../../../theme/theme"
import Modal from "../../../components/Modal"
import DebtPayment from "../form/debtPayment"
import { useUser } from "../../../context/globalContext"
import { unformatCurrency } from "../../../services/unformatCurrency"
import ValueReservation from "./valueReservation"

const SecondColumn = (props) => {

    const {
        hasDebt,
        error,
        messageError,
        valuesDebt,
        total,
        valorDaReservaAtual,
        diferenca,
        setLinhas,
        linhas,
        setTrocoCliente,
        trocoCliente
    } = props.states
    const { cancelColor } = theme
    const { 
        selectedClient, 
        valorAPagar, 
        setValorAPagar, 
        valueSelectDebt, 
        setValueSelectDebt 
    } = useUser()

    const [openDebt, setOpenDebt] = useState(false)
    const [valorInput, setValorInput] = useState("")
    const [valorSelect, setValorSelect] = useState("credit-card")

    const reservaParko = selectedClient?.parkoapp ?? ""

    const valores = linhas.map(item => {
        return unformatCurrency(item.valorPgto)/100
    })
    const somarValores = valores.reduce((prev, current) => {
        return prev + current + (valorAPagar ? valorAPagar : 0)
    })

    const alterarLinhas = () => {
        const optionMoney = linhas.filter(item => item.valueSelect === "money") 

        if((optionMoney.length > 0 || valueSelectDebt === "money") && (somarValores > unformatCurrency(total)/100)) {
            return setTrocoCliente(somarValores - (unformatCurrency(total)/100))
        }

        return setTrocoCliente(0)
    }

    const optionMoney = linhas.filter(item => item.valueSelect === "money")

    const troco = (index) => {
        const { valorPgto, valueSelect } = linhas[index]

        if ((somarValores > unformatCurrency(total)/100) && (optionMoney.length > 0 || valueSelectDebt === "money")) {
            setTrocoCliente(somarValores - (unformatCurrency(total)/100))
        }

        if (valueSelect !== "money" || valorPgto < 0) {
            setLinhas(linhas.map((linha, i) =>
                i === index ? { ...linha, trocoCliente: 0 } : linha
            ))
        }
    }

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

        const formatValue = rawValue?.replace(/\D/g, '').slice(0, 6)
        const numericValue = unformatCurrency(formatValue) / 100
        
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

    const addLine = e => {
        e.preventDefault()

        // Separar as formas de pagamento por linha
        setLinhas([...linhas, { valorPgto: "", valueSelect: "credit-card" }])
    }

    function pagarDivida(e) {
        e.preventDefault()

        if(unformatCurrency(valorInput)/100 > valuesDebt) {
            alert("O valor informado não pode ser maior que o valor total da dívida")

            setValorInput(formatCurrency(valuesDebt, 'BRL'))
            setValorAPagar(valuesDebt)
            setValueSelectDebt(valorSelect)
            setOpenDebt(false)
            return
        }

        if(unformatCurrency(valorInput)/100 < valuesDebt) {
            alert("Preencha o valor completo da dívida")
            
            setValorInput(formatCurrency(valuesDebt, 'BRL'))
            setValorAPagar(valuesDebt)
            setValueSelectDebt(valorSelect)
            setOpenDebt(false)
            return
        }

        setValorAPagar(unformatCurrency(valorInput)/100)
        setValueSelectDebt(valorSelect)
        setOpenDebt(false)
    }

    const renderItem = () => {
        return linhas.map((linha, index) => (
            <ArrayElement key={index}>
                <Select
                    value={linha.valueSelect}
                    disabled={reservaParko === 1 ? true : false}
                    onChange={e => handleSelectChange(e, index)}
                >
                    <option value="credit-card">Maquineta (Crédito)</option>
                    <option value="debit-card">Maquineta (Débito)</option>
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
        if(trocoCliente < 0) {
            setTrocoCliente(0)
        }
    }, [trocoCliente])
    
    useEffect(() => {
        alterarLinhas()
    }, [linhas])

    return <>
        <SecondSection>
            {hasDebt === true &&
                <div>
                    {/* 1ª linha: Valor da dívida + input + select */}
                    <ValueReservation
                        titulo="Dívida Total"
                        variavel={valuesDebt}
                        corDoTexto={cancelColor}
                    />
                    <Payment>
                        <Select 
                            value={valueSelectDebt}
                            onChange={e => setValueSelectDebt(e.target.value)}
                            disabled
                        >
                            <option value="credit-card">Maquineta (Crédito)</option>
                            <option value="debit-card">Maquineta (Débito)</option>
                            <option value="money">Dinheiro</option>
                            <option value="pix">Pix</option>
                        </Select>
                        <Price
                            type="text" 
                            placeholder="Valor (R$)" 
                            value={formatCurrency(valorAPagar ? valorAPagar : 0, 'BRL')}
                            disabled
                        />
                        <Add onClick={() => setOpenDebt(true)}>+</Add>
                        <Modal
                            isOpen={openDebt}
                            setOpen={setOpenDebt}
                            title={"Pagamento de Dívida"}
                            maxWidth={"30rem"}
                            funcao={e => pagarDivida(e)}
                        >
                            <DebtPayment 
                                selectedClient={selectedClient} 
                                debt={valuesDebt} 
                                valorInput={valorInput}
                                setValorInput={setValorInput}
                                setValorSelect={setValorSelect}
                                valorSelect={valorSelect}
                            />
                        </Modal>
                    </Payment>
                </div>
            }
            <div>
                {/* 2ª linha: Valor da reserva + dívida a receber (se tiver) + input + select */}
                <Receive>
                    <ValueReservation 
                        titulo="Valor a receber" 
                        variavel={diferenca < 0 ? selectedClient?.value : valorDaReservaAtual} 
                    />

                    {hasDebt === true &&
                        <ValueReservation 
                            titulo="Dívida a receber" 
                            variavel={valorAPagar} 
                            corDoTexto={cancelColor}
                        />
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
            {total && <ValueReservation titulo="Valor total" variavel={total} />}
            
            {/* Troco do cliente caso pague em dinheiro */}
            <ValueReservation titulo="Troco" variavel={trocoCliente} />
        </SecondSection>
    </>
}

export default SecondColumn