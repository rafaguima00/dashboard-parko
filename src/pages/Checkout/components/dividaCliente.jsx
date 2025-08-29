import { useEffect, useState } from "react"
import Modal from "../../../components/Modal"
import { formatCurrency } from "../../../utils/FormatCurrency"
import { Back, CreditClient, DebtClient, DivDebt, NameClient, Receive } from "../style"
import ModalDividaCliente from "./modalDividaCliente"
import api from "../../../services/api/server"
import ReadApi from "../../../services/readData"
import { useUser } from "../../../context/globalContext"
import useReservation from "../../../hooks/useReservation"
import { RiCloseLine } from "react-icons/ri"

const DividaCliente = (props) => {

    const { 
        debtClient, 
        item, 
        valuesDebt,
        setClicked,
        verificarDividas,
        dividasDaReserva
    } = props
    const { listDividas } = ReadApi()
    const { debts, reservations } = useUser()
    const { fetchReservations } = useReservation()

    const [isOpen, setIsOpen] = useState(false)
    const [valorAPagar, setValorAPagar] = useState("")
    const [valorSelect, setValorSelect] = useState("")
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
            payment_method: valorSelect
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
            fetchReservations()
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
                    <p>{formatCurrency(item.creditos_da_reserva, 'BRL')}</p>
                </DivDebt>
                <DivDebt>
                    <p>Créditos do Cliente:</p>
                    <p>{formatCurrency(item.creditos_do_cliente, 'BRL')}</p>
                </DivDebt>
                <Back onClick={() => setClicked(null)}>
                    <RiCloseLine size={22} />
                </Back>
            </CreditClient> :
            <DebtClient>
                <NameClient>{item.name}</NameClient>
                <DivDebt>
                    <p>Dívidas da Reserva:</p>
                    <p>{formatCurrency(dividasDaReserva, 'BRL')}</p>
                </DivDebt>
                <DivDebt>
                    <p>Dívidas do Cliente:</p>
                    <p>{formatCurrency(valuesDebt, 'BRL')}</p>
                </DivDebt>
                <Receive onClick={abrirModal}>Receber Dívida</Receive>
                <Back onClick={() => setClicked(null)}>
                    <RiCloseLine size={22} />
                </Back>
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
                setValorSelect={setValorSelect}
                valuesDebt={valuesDebt}
                reservaParko={item.parko_app}
                name={item.name}
            />
        </Modal>
    </>
}

export default DividaCliente