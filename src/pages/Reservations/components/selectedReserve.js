import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/globalContext";
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
import Top from "../../../components/top/top";
import { theme } from "../../../theme/theme";
import Modal from "../../../components/Modal";
import EditModal from "../form/edit";
import DebtPayment from "../form/debtPayment";

const SelectedReserve = (props) => {

    const { getDebtById } = props;
    const { neutralColor } = theme;

    const { selectedClient } = useContext(GlobalContext);
    const { id } = selectedClient;

    const [openEdit, setOpenEdit] = useState(false);
    const [openDebt, setOpenDebt] = useState(false);

    const valorTotal = () => {
        if(selectedClient.value !== undefined) {
            if(getDebtById !== undefined) {
                return selectedClient.value + getDebtById.value
            } else {
                return selectedClient.value
            }
        } else {
            return 0;
        }
    }

    const total = valorTotal();

    return (
        <Content>
            <Top children="Reserva Selecionada" font={19}/>
            <List>
                <section>
                    <GridItems>
                        <InfoReservation>
                            <strong>Número reserva: </strong>
                            <p>{selectedClient.id}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Placa: </strong>
                            <p>{selectedClient.license_plate}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Cliente: </strong>
                            <p>{selectedClient.name}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Entrada: </strong>
                            <p>{selectedClient.data_entrada}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Veículo: </strong>
                            <p>{selectedClient.name_vehicle}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Saída: </strong>
                            <p>{selectedClient.data_saida}</p>
                        </InfoReservation>
                    </GridItems>
                    <Edit
                        onClick={() => setOpenEdit(true)}
                    >
                        Editar
                    </Edit>
                    <Modal
                        isOpen={openEdit}
                        setOpen={setOpenEdit}
                        title={`Nº ${id}`}
                        maxWidth={"52rem"}
                        funcao={() => {console.log("item salvo ok")}}
                    >
                        <EditModal selectedClient={selectedClient} />
                    </Modal>
                </section>
                <SecondSection>
                    {getDebtById !== undefined &&
                        <div>
                            <TextOption>
                                Dívida Total <strong style={{ color: neutralColor }}>{formatCurrency(getDebtById.value, 'BRL')}</strong>
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
                                Valor a receber <strong>{formatCurrency(total, 'BRL')}</strong>
                            </TextOption>
                            {getDebtById !== undefined &&
                                <TextOption>
                                    Dívida a receber <strong style={{ color: '#d64d4d' }}>
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
                            <Price>{formatCurrency(total, 'BRL')}</Price>
                            <Add>+</Add>
                        </Payment>
                    </div>
                    <TextOption>
                        Total recebido <strong>{formatCurrency(0, 'BRL')}</strong>
                    </TextOption>
                    <TextOption>
                        Troco <strong>{formatCurrency(0, 'BRL')}</strong>
                    </TextOption>
                </SecondSection>
            </List>
        </Content>
    )
}

export default SelectedReserve;