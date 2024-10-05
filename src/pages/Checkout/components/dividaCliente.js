import { formatCurrency } from "../../../services/formatCurrency"
import { Back, CreditClient, DebtClient, DivDebt, NameClient, Receive } from "../style"

const DividaCliente = (props) => {

    const { 
        debtClient, 
        item, 
        valuesDebt,
        setClicked
    } = props

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
                <Receive>Receber Dívida</Receive>
                <Back onClick={() => setClicked(null)}>x</Back>
            </DebtClient> 
        }
    </>
}

export default DividaCliente