import { useEffect, useState } from "react";
import { useUser } from "../../../context/globalContext";
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
} from "../style";
import { formatCurrency } from "../../../services/formatCurrency";
import Top from "../../../components/Top";
import { theme } from "../../../theme/theme";
import Modal from "../../../components/Modal";
import EditModal from "../form/edit";
import DebtPayment from "../form/debtPayment";
import api from "../../../services/api/server";

const SelectedReserve = (props) => {

    const { getDebtById, reservaPendente } = props;
    const { neutralColor } = theme;

    const { selectedClient, setSelectedClient } = useUser();

    const [openEdit, setOpenEdit] = useState(false);
    const [openDebt, setOpenDebt] = useState(false);

    const handleUpdate = async (id) => {
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
            alert("Reserva atualizada com sucesso.");
            setOpenEdit(false);
        })
        .catch(e => {
            console.log(e);
        })
    };

    const valorTotal = () => {
        if(reservaPendente) {
            if(getDebtById) {
                return formatCurrency(selectedClient.value + getDebtById.value, 'BRL') 
            } else {
                return formatCurrency(0, 'BRL') 
            }
        } else {
            return 0
        }
    };

    const total = valorTotal();

    useEffect(() => {
        if(reservaPendente) {
            const indexOf = reservaPendente.values().next().value
            setSelectedClient(indexOf)
        }
    }, [])

    return (
        <Content>
            <Top children="Reserva Selecionada" font={19}/>
            <List>
                <section>
                    <GridItems>
                        <InfoReservation>
                            <strong>Número reserva: </strong>
                            <p>{selectedClient ? selectedClient.id : ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Placa: </strong>
                            <p>{selectedClient ? selectedClient.license_plate : ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Cliente: </strong>
                            <p>{selectedClient ? selectedClient.name : ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Entrada: </strong>
                            <p>{selectedClient ? selectedClient.data_entrada : ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Veículo: </strong>
                            <p>{selectedClient ? selectedClient.name_vehicle : ""}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Saída: </strong>
                            <p>{selectedClient ? selectedClient.data_saida : ""}</p>
                        </InfoReservation>
                    </GridItems>
                    <Edit onClick={() => setOpenEdit(true)}>Editar</Edit>
                    <Modal
                        isOpen={openEdit}
                        setOpen={setOpenEdit}
                        title={selectedClient ? `Nº ${selectedClient.id}` : ""}
                        maxWidth={"52rem"}
                        funcao={() => handleUpdate(selectedClient.id)} 
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
                                <Price>{formatCurrency(getDebtById.value, 'BRL')}</Price>
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
                            <Price>{total}</Price>
                            <Add>+</Add>
                        </Payment>
                    </div>
                    <TextOption>
                        Total recebido {"\n"}
                        <strong>
                            {formatCurrency(0, 'BRL')}
                        </strong>
                    </TextOption>
                    <TextOption>
                        Troco {"\n"}
                        <strong>
                            {formatCurrency(0, 'BRL')}
                        </strong>
                    </TextOption>
                </SecondSection>
            </List>
        </Content>
    )
}

export default SelectedReserve;