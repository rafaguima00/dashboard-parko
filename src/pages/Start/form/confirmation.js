import { SmallText, Square } from "./style"
import { theme } from "../../../theme/theme"
import OtpInput from 'react-otp-input'

const Confirmation = (props) => {

    const { otp, setOtp } = props
    const { neutralColor } = theme
    const containerStyle = { 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: '1rem'
    }
    const inputStyle = { width: '80px', height: '80px' }

    return (
        <div>
            <SmallText textcolor={neutralColor}>
                Escreva o Código de Confirmação do cliente abaixo:
            </SmallText>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) => <Square {...props} />}
                inputType="tel"
                containerStyle={containerStyle}
                inputStyle={inputStyle}
            />
        </div>
    )
}

export default Confirmation