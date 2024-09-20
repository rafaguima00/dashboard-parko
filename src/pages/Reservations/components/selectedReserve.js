import { useEffect, useState } from "react"
import { useUser } from "../../../context/globalContext"
import {
    Content,
    List,
    GridItems,
    InfoReservation,
    Edit,
    SecondSection,
    TextOption,
    Payment,
    Select,
    Price,
    Add,
    Receive
} from "../style"
import { formatCurrency } from "../../../services/formatCurrency"
import Top from "../../../components/Top"
import { theme } from "../../../theme/theme"
import Modal from "../../../components/Modal"
import EditModal from "../form/edit"
import DebtPayment from "../form/debtPayment"
import api from "../../../services/api/server"

const SelectedReserve = (props) => {

    const { getDebtById, reservaAberta } = props
    const { neutralColor } = theme
    const { selectedClient, setSelectedClient } = useUser()

    const [openEdit, setOpenEdit] = useState(false)
    const [openDebt, setOpenDebt] = useState(false)
    const [loading, setLoading] = useState(false)
    const [valor, setValor] = useState({
        valor1: null
    })

    const handleUpdate = async (id, e) => {
        e.preventDefault()
        setLoading(true)

        await api.put(`reservations/${id}`, {
            data_entrada: selectedClient.data_entrada,
            hora_entrada: selectedClient.hora_entrada,
            data_saida: selectedClient.data_saida,
            hora_saida: selectedClient.hora_saida,
            value: selectedClient.value,
            status: 1,
            id_vehicle: selectedClient.id_vehicle
        })
        .then(() => {
            setLoading(false)
            alert("Reserva atualizada com sucesso.")
            setOpenEdit(false)
        })
        .catch(e => {
            setLoading(false)
            console.log(e)
        })
    }

    const valorTotal = () => {
        if(reservaAberta && selectedClient) {
            if(getDebtById) {
                return formatCurrency(selectedClient.value + getDebtById.value, 'BRL') 
            } 

            return formatCurrency(selectedClient?.value ?? 0, 'BRL') 
        } 
    }

    const addPayment = () => {
        console.log(`pagamento de ${selectedClient?.name ?? "usuário"} selecionado`)
    }

    const total = valorTotal()

    useEffect(() => {
        if(reservaAberta) {
            const indexOf = reservaAberta.values().next().value
            setSelectedClient(indexOf)
        }
    }, [])

    return (
        <Content>
            <Top children="Reserva Selecionada" font={19}/>
            <List padding={"2.4rem 4rem"}>
                <section>
                    <GridItems>
                        <InfoReservation>
                            <strong>Número reserva: </strong>
                            <p>{selectedClient?.id ?? ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Placa: </strong>
                            <p>{selectedClient?.license_plate ?? ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Cliente: </strong>
                            <p>{selectedClient?.name ?? ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Entrada: </strong>
                            <p>{selectedClient?.data_entrada ?? ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Veículo: </strong>
                            <p>{selectedClient?.name_vehicle ?? ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Saída: </strong>
                            <p>{selectedClient?.data_saida ?? ""}</p>
                        </InfoReservation>
                    </GridItems>
                    {/* 
                        Desabilitar edição do horário de entrada para clientes com reserva confirmada e  
                        clientes Parko. Habilitar edição apenas para clientes não-parko com reserva PENDENTE
                    */}
                    <Edit onClick={() => setOpenEdit(true)}>Editar</Edit>
                    <Modal
                        isOpen={openEdit}
                        setOpen={setOpenEdit}
                        title={selectedClient ? `Nº ${selectedClient.id}` : ""}
                        maxWidth={"52rem"}
                        funcao={e => handleUpdate(selectedClient.id, e)} 
                        isLoading={loading}
                    >
                        <EditModal states={{ selectedClient, setSelectedClient }} />
                    </Modal>
                </section>
                <SecondSection>
                    {getDebtById !== undefined &&
                        <div>
                            <TextOption>
                                Dívida Total {"\n"}
                                <strong style={{ color: neutralColor }}>
                                    {formatCurrency(getDebtById.value, 'BRL')}
                                </strong>
                            </TextOption>
                            <Payment>
                                <Select defaultValue="personal">
                                    <option value="credit-parko">Crédito Parko</option>
                                    <option value="debit">Débito Parko</option>
                                    <option value="pix">Pix Parko</option>
                                    <option value="credit">Crédito Pessoal</option>
                                    <option value="personal" selected>Dívida Pessoal</option>
                                    <option value="money">Dinheiro</option>
                                </Select>
                                <Price>
                                    <p>{formatCurrency(getDebtById.value, 'BRL')}</p>
                                </Price>
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
                                    <DebtPayment selectedClient={selectedClient} debt={getDebtById.value} />
                                </Modal>
                            </Payment>
                        </div>
                    }
                    <div>
                        <Receive>
                            <TextOption>
                                Valor a receber {"\n"}
                                <strong>
                                    {total}
                                </strong>
                            </TextOption>
                            {getDebtById !== undefined &&
                                <TextOption>
                                    Dívida a receber {"\n"}
                                    <strong style={{ color: '#d64d4d' }}>
                                        {formatCurrency(getDebtById.value, 'BRL')}
                                    </strong>
                                </TextOption>
                            }
                        </Receive>
                        <Payment>
                            <Select defaultValue="credit-parko">
                                <option value="credit-parko">Crédito Parko</option>
                                <option value="debit">Débito Parko</option>
                                <option value="pix">Pix Parko</option>
                                <option value="credit">Crédito Pessoal</option>
                                <option value="personal">Dívida Pessoal</option>
                                <option value="money">Dinheiro</option>
                            </Select>
                            <Price 
                                type="number" 
                                placeholder="Valor (R$)" 
                                value={valor.valor1}
                                onChange={e => setValor({ ...valor, valor1: e.target.value })} 
                            />
                            <Add onClick={() => addPayment()}>
                                +
                            </Add>
                        </Payment>
                    </div>
                    <TextOption>
                        Total recebido {"\n"}
                        <strong>
                            {total}
                        </strong>
                    </TextOption>
                    <TextOption>
                        Troco {"\n"}
                        <strong>
                            {total}
                        </strong>
                    </TextOption>
                </SecondSection>
            </List>
        </Content>
    )
}

export default SelectedReserve