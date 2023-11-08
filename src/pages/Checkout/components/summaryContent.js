import { useContext } from "react";
import { GlobalContext } from "../../../context/globalContext";
import {
    Summary,
    Header,
    Pg,
    InfoCheckout,
    Info
} from "../style";
import camera from "../../../assets/camera.png";

const SummaryContent = () => {

    const { dataClient } = useContext(GlobalContext);
    const { email, username, login } = dataClient;

    return (
        <Summary>
            <Header>
                <img src={camera} alt="Avatar" />
                <div>
                    <Pg><strong>Responsável: </strong>{username}</Pg>
                    <Pg><strong>E-mail: </strong>{email}</Pg>
                    <Pg><strong>Abertura do caixa: </strong>{login}</Pg>
                    <Pg><strong>Fechamento do caixa: </strong></Pg>
                    <Pg><strong>Valor da abertura (dinheiro): </strong></Pg>
                    <Pg><strong>Valor do fechamento (dinheiro): </strong></Pg>
                </div>
            </Header><hr/>
            <InfoCheckout>
                <Info>
                    <p>Abertura do caixa</p>
                    <p>R$ 100,00</p>
                </Info>
                <Info>
                    <p>Vendas em dinheiro</p>
                    <p>R$ 25,00</p>
                </Info>
                <Info>
                    <p>Recebimento de dívidas (dinheiro)</p>
                    <p>R$ 0,00</p>
                </Info>
                <Info>
                    <p>Aportes</p>
                    <p>R$ 0,00</p>
                </Info>
                <Info>
                    <p>Retiradas</p>
                    <p>-R$ 10,00</p>
                </Info>
                <Info>
                    <p>Fechamento do caixa</p>
                    <p>R$ 350,00</p>
                </Info>
            </InfoCheckout><hr/>
            <InfoCheckout>
                <h3>Resumo de vendas</h3>
                <Info>
                    <p>Dinheiro</p>
                    <p>R$ 100,00</p>
                </Info>
                <Info>
                    <p>Pix</p>
                    <p>R$ 25,00</p>
                </Info>
                <Info>
                    <p>Débito</p>
                    <p>R$ 0,00</p>
                </Info>
                <Info>
                    <p>Crédito</p>
                    <p>R$ 0,00</p>
                </Info>
                <Info>
                    <p>Parko Débito</p>
                    <p>R$ 10,00</p>
                </Info>
                <Info>
                    <p>A pagar</p>
                    <p>R$ 350,00</p>
                </Info>
                <Info>
                    <p>Total</p>
                    <p>R$ 350,00</p>
                </Info>
            </InfoCheckout>
        </Summary>
    )
}

export default SummaryContent;