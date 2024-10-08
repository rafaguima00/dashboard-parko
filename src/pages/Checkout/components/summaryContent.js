import { useUser } from "../../../context/globalContext"
import {
    Summary,
    Header,
    Pg,
    InfoCheckout,
    Info
} from "../style"
import avatar from "../../../assets/avatar.png"
import { theme } from "../../../theme/theme"
import { formatCurrency } from "../../../services/formatCurrency"
import { useEffect } from "react"
import api from "../../../services/api/server"

const SummaryContent = (props) => {

    const { dataClient, caixaAberto, setCaixaAberto } = useUser()
    const { email, colaborator } = dataClient
    const { 
        valoresTotal, 
        valoresAporte, 
        valoresRetiradas
    } = props.resumo

    const { cancelColor, neutralColor, primaryColor } = theme

    async function verificarCaixa() {
        await api.get(`/abertura_caixa/parking/${dataClient.id_establishment}`)
        .then(res => {
            setCaixaAberto(res.data[res.data.length - 1])
        })
        .catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        if(dataClient.id_establishment) {
            verificarCaixa()
        }
    }, [caixaAberto, dataClient.id_establishment])

    return (
        <Summary>
            <Header>
                <img src={dataClient.image ? dataClient.image : avatar} alt="Avatar" />
                <div>
                    <Pg><strong>Responsável: </strong>{colaborator}</Pg>
                    <Pg><strong>E-mail: </strong>{email}</Pg>
                    <Pg>
                        <strong>Abertura do caixa: </strong>
                        {`${caixaAberto?.data_abertura ?? ""}, ${caixaAberto?.hora_abertura ?? ""}`}
                    </Pg>
                    <Pg>
                        <strong>Fechamento do caixa: </strong>
                        {`${caixaAberto?.data_fechamento ?? ""}, ${caixaAberto?.hora_fechamento ?? ""}`}
                    </Pg>
                    <Pg><strong>Valor da abertura (dinheiro): </strong>{formatCurrency(0, 'BRL')}</Pg>
                    <Pg><strong>Valor do fechamento (dinheiro): </strong>{formatCurrency(0, 'BRL')}</Pg>
                </div>
            </Header><hr/>
            <InfoCheckout>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Abertura do caixa</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={primaryColor} textcolor={neutralColor}>
                    <p>Vendas em dinheiro</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={primaryColor} textcolor={neutralColor}>
                    <p>Recebimento de dívidas (dinheiro)</p>
                    <p>{formatCurrency(0, 'BRL')}</p> {/* Pendente. Somente o recebimento de dívidas */}
                </Info>
                <Info pricetxtcolor={primaryColor} textcolor={neutralColor}> 
                    <p>Aportes</p>
                    <p>{formatCurrency(valoresAporte, 'BRL')}</p> 
                </Info>
                <Info pricetxtcolor={cancelColor} textcolor={neutralColor}> 
                    <p>Retiradas</p>
                    <p>{formatCurrency(valoresRetiradas, 'BRL')}</p> 
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor="#000">
                    <p>Fechamento do caixa</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
            </InfoCheckout><hr/>
            <InfoCheckout>
                <h3>Resumo de vendas</h3>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Dinheiro</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Pix</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Débito</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>Crédito</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor={neutralColor}>
                    <p>A pagar</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
                <Info pricetxtcolor={neutralColor} textcolor="#000">
                    <p>Total</p>
                    <p>{formatCurrency(0, 'BRL')}</p>
                </Info>
            </InfoCheckout>
        </Summary>
    )
}

export default SummaryContent