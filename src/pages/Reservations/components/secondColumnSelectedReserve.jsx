import { useEffect, useState } from "react"
import { 
    Add,
    DivError,
    DivPayment,
    MessageError,
    Payment, 
    Receive, 
    SecondSection
} from "../style"
import { theme } from "../../../theme/theme"
import Modal from "../../../components/Modal"
import DebtPayment from "../form/debtPayment"
import { useUser } from "../../../context/globalContext"
import { unformatCurrency } from "../../../utils/UnformatCurrency"
import ValueReservation from "./valueReservation"
import useReservation from "../../../hooks/useReservation"
import RenderItem from "../components/renderItem"
import { validateDebt } from "../utils/validateDebt"
import LineDebt from "./lineDebt"
import { FiPlus } from "react-icons/fi"
import { calculateReservationValue } from "../../../utils/CalculateReservationValue"
import RadioArea from "./radioArea"

const SecondColumn = (props) => {

    const {
        hasDebt,
        error,
        messageError,
        valuesDebt,
        setPaymentLines,
        paymentLines,
        setTrocoCliente,
        trocoCliente
    } = props.states
    const { cancelColor } = theme
    const { 
        selectedClient, 
        valorAPagar, 
        setValorAPagar, 
        valueSelectDebt, 
        setValueSelectDebt,
        priceTable, tabelaFixa,
        changeNeeded, setChangeNeeded
    } = useUser()
    const { valorTotal } = useReservation()
    const total = valorTotal()
    const { valorDaReservaAtual } = calculateReservationValue(selectedClient, priceTable, tabelaFixa, selectedClient.type_of_charge)

    const [openDebt, setOpenDebt] = useState(false)
    const [valorInput, setValorInput] = useState("")
    const [valorSelect, setValorSelect] = useState("credit_card")

    const valores = paymentLines.map(item => {
        return unformatCurrency(item.valorPgto) / 100
    })
    const somarValores = valores.reduce((prev, current) => {
        return prev + current + (valorAPagar ? valorAPagar : 0)
    })

    const optionMoney = paymentLines.filter(item => item.valueSelect === "money") 

    const alterarLinhas = () => {

        if ((optionMoney.length > 0 || valueSelectDebt === "money") && (somarValores > total)) {
            return setTrocoCliente(somarValores - total)
        }

        return setTrocoCliente(0)
    }

    const addLine = e => {
        e.preventDefault()

        // Separar as formas de pagamento por linha
        setPaymentLines([...paymentLines, { valorPgto: "", valueSelect: "credit_card" }])
    }

    function validarDivida(res) {
        setValorAPagar(res.valorAPagar)
        setValueSelectDebt(res.valueSelectDebt)
        setValorInput(res.valorInput)
        setOpenDebt(res.open)
    }

    useEffect(() => {
        if (trocoCliente < 0) {
            setTrocoCliente(0)
        }
    }, [trocoCliente])
    
    useEffect(() => {
        alterarLinhas()
    }, [paymentLines])

    return <>
        <SecondSection>
            {hasDebt &&
                <div>
                    {/* 1ª linha: Valor da dívida + input + select */}
                    <ValueReservation
                        titulo="Dívida Total"
                        variavel={valuesDebt}
                        corDoTexto={cancelColor}
                    />
                    <Payment>
                        <LineDebt states={{ valueSelectDebt, valorAPagar, setOpenDebt }} />
                    </Payment>
                </div>
            }
            <div>
                {/* 2ª linha: Valor da reserva + dívida a receber (se tiver) + input + select */}
                <Receive>
                    <ValueReservation 
                        titulo="Valor a receber" 
                        variavel={valorDaReservaAtual} 
                    />

                    {hasDebt &&
                        <ValueReservation 
                            titulo="Dívida a receber" 
                            variavel={valorAPagar} 
                            corDoTexto={cancelColor}
                        />
                    }
                </Receive>
                <Payment>
                    <DivPayment>
                        <RenderItem states={{ paymentLines, setPaymentLines, somarValores, setTrocoCliente, optionMoney }} />
                    </DivPayment>
                    <Add onClick={addLine}>
                        <FiPlus size={".8em"} />
                    </Add>
                </Payment>
                {error === true && 
                    <DivError>
                        <MessageError>{messageError}</MessageError>
                    </DivError>
                }
            </div>
            {optionMoney.length > 0 && 
                <RadioArea 
                    children="O cliente vai precisar de troco?" 
                    changeNeeded={changeNeeded}
                    setChangeNeeded={setChangeNeeded}
                />
            }

            {/* 3° linha: Valor da reserva + valor da dívida */}
            {total && <ValueReservation titulo="Valor total" variavel={total} />}
            
            {/* 4° linha:  Troco do cliente caso pague em dinheiro */}
            <ValueReservation titulo="Troco" variavel={trocoCliente} />
        </SecondSection>

        <Modal
            isOpen={openDebt}
            setOpen={setOpenDebt}
            title={"Pagamento de Dívida"}
            maxWidth={"30rem"}
            funcao={e => {
                const res = validateDebt(e, valorInput, valorSelect, valuesDebt)
                validarDivida(res)
            }}
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
    </>
}

export default SecondColumn