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

const SelectedReserve = () => {

    const { neutralColor } = theme;

    const { selectedClient } = useContext(GlobalContext);
    const {
        id,
        name,
        vehicle,
        licensePlate,
        dateEntry,
        dateExit,
        value,
        debt
    } = selectedClient;

    const valorAReceber = 20;

    const change = valorAReceber - value;

    const [openEdit, setOpenEdit] = useState(false);
    const [openDebt, setOpenDebt] = useState(false);

    return (
        <Content>
            <Top children="Reserva Selecionada" font={19}/>
            <List>
                <section>
                    <GridItems>
                        <InfoReservation>
                            <strong>Número reserva: </strong>
                            <p>{id}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Placa: </strong>
                            <p>{licensePlate}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Cliente: </strong>
                            <p>{name}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Entrada: </strong>
                            <p>{dateEntry}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Veículo: </strong>
                            <p>{vehicle}</p>
                        </InfoReservation>
                        <InfoReservation>
                            <strong>Saída: </strong>
                            <p>{dateExit}</p>
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
                    >
                        <EditModal selectedClient={selectedClient} />
                    </Modal>
                </section>
                <SecondSection>
                    {debt > 0 &&
                        <div>
                            <TextOption>
                                Dívida Total <strong style={{ color: neutralColor }}>{formatCurrency(debt, 'BRL')}</strong>
                            </TextOption>
                            <Payment>
                                <Select name="select">
                                    <option value="credit-parko">Crédito Parko</option>
                                    <option value="debit">Débito Parko</option>
                                    <option value="pix">Pix Parko</option>
                                    <option value="credit">Crédito Pessoal</option>
                                    <option value="personal" selected>Dívida Pessoal</option>
                                    <option value="money">Dinheiro</option>
                                </Select>
                                <Price>{formatCurrency(debt, 'BRL')}</Price>
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
                                    <DebtPayment selectedClient={selectedClient} valorAReceber={valorAReceber} />
                                </Modal>
                            </Payment>
                        </div>
                    }
                    <div>
                        <Receive>
                            <TextOption>
                                Valor a receber <strong>{formatCurrency(value, 'BRL')}</strong>
                            </TextOption>
                            {debt > 0 &&
                                <TextOption>
                                    Dívida a receber <strong style={{ color: '#d64d4d' }}>{formatCurrency(debt, 'BRL')}</strong>
                                </TextOption>
                            }
                        </Receive>
                        <Payment>
                            <Select>
                                <option value="credit-parko">Crédito Parko</option>
                                <option value="debit">Débito Parko</option>
                                <option value="pix">Pix Parko</option>
                                <option value="credit">Crédito Pessoal</option>
                                <option value="personal">Dívida Pessoal</option>
                                <option value="money">Dinheiro</option>
                            </Select>
                            <Price>{formatCurrency(valorAReceber, 'BRL')}</Price>
                            <Add>+</Add>
                        </Payment>
                    </div>
                    <TextOption>Total recebido <strong>{formatCurrency(valorAReceber, 'BRL')}</strong></TextOption>
                    <TextOption>Troco <strong>{formatCurrency(change, 'BRL')}</strong></TextOption>
                </SecondSection>
            </List>
        </Content>
    )
}

export default SelectedReserve;