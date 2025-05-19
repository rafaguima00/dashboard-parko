import { useEffect, useState } from "react"
import Modal from "../../../components/Modal"
import { formatCurrency } from "../../../services/formatCurrency"
import { Back, CreditClient, DebtClient, DivDebt, NameClient, Receive } from "../style"
import ModalDividaCliente from "./modalDividaCliente"
import api from "../../../services/api/server"
import ReadApi from "../../../services/readData"
import { useUser } from "../../../context/globalContext"

const DividaCliente = (props) => {

    const { 
        debtClient, 
        item, 
        valuesDebt,
        setClicked,
        verificarDividas
    } = props
    const { listDividas, listReservations } = ReadApi()
    const { dataClient, debts, reservations } = useUser()

    const [isOpen, setIsOpen] = useState(false)
    const [valorAPagar, setValorAPagar] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function unformatCurrency(num) {
        return num.replace(/[^\d]/g, "").slice(0, 6)
    }

    function abrirModal() {
        setIsOpen(true)
    }

    async function atualizarDivida(e) {
        e.preventDefault()
        setIsLoading(true)

        await api.put(`/debts/${item.id_costumer}`, { 
            value: unformatCurrency(valorAPagar) / 100, 
            id_establishment: item.id_establishment,
            payment_method: "" // Pendente
        })
        .then(() => {
            alert("Pagamento de dívida registrado com sucesso!")
            setIsOpen(false)
        })
        .catch(e => {
            alert(e)
        })
        .finally(() => {
            listDividas()
            listReservations(dataClient.id_establishment)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        verificarDividas()
    }, [debts, reservations])

    return <>
        {debtClient === false ? 
            <CreditClient>
                <NameClient>{item.name}</NameClient>
                <DivDebt>
                    <p>Créditos da Reserva:</p>
                    <p>{formatCurrency(item.value, 'BRL')}</p>
                </DivDebt>
                <DivDebt>
                    <p>Créditos do Cliente:</p>
                    <p>{formatCurrency(item.value, 'BRL')}</p>
                </DivDebt>
                <Back onClick={() => setClicked(null)}>x</Back>
            </CreditClient> :
            <DebtClient>
                <NameClient>{item.name}</NameClient>
                <DivDebt>
                    <p>Dívidas da Reserva:</p>
                    <p>{formatCurrency(valuesDebt, 'BRL')}</p>
                </DivDebt>
                <DivDebt>
                    <p>Dívidas do Cliente:</p>
                    <p>{formatCurrency(valuesDebt, 'BRL')}</p>
                </DivDebt>
                <Receive onClick={abrirModal}>Receber Dívida</Receive>
                <Back onClick={() => setClicked(null)}>x</Back>
            </DebtClient> 
        }
        <Modal
            isOpen={isOpen}
            setOpen={setIsOpen}
            title={"Pagamento de Dívida"}
            maxWidth={"30rem"}
            funcao={e => atualizarDivida(e)}
            isLoading={isLoading}
        >
            <ModalDividaCliente 
                setValorAPagar={setValorAPagar}
                valorAPagar={valorAPagar}
                valuesDebt={valuesDebt}
                name={item.name}
            />
        </Modal>
    </>
}

export default DividaCliente