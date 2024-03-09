import { useEffect, useState } from "react";
import { SmallText } from "./style";
import { theme } from "../../../theme/theme";

const Confirmation = () => {

    const { neutralColor } = theme;

    const [typedNumber, setTypedNumber] = useState(null);

    const gerarNumero = () => {
        const number1 = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return parseInt(number1, 10);
    }

    const numeroGerado = gerarNumero();

    useEffect(() => {
        console.log(numeroGerado)
    }, [])

    const handleClick = (e, numeroDigitado) => {
        e.preventDefault();

        const integerNumber = +numeroDigitado;

        if(parseInt(integerNumber, 10) === numeroGerado) {
            console.log("confere")
        } else {
            console.log("não confere")
        }

        console.log(parseInt(integerNumber, 10))
    }

    return (
        <div>
            <SmallText textcolor={neutralColor}>
                Escreva o Código de Confirmação do cliente abaixo:
            </SmallText>
            <form>
                <input 
                    type="number" 
                    value={typedNumber}
                    onChange={e => setTypedNumber(e.target.value)} 
                />
                <button onClick={e => handleClick(e, typedNumber)}>Send</button>
            </form>
        </div>
    )
}

export default Confirmation;