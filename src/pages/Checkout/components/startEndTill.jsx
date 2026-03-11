import TextInput from "../../../components/Input"
import { theme } from "../../../theme/theme"
import { formatCurrency } from "../../../utils/FormatCurrency"
import { unformatCurrency } from "../../../utils/UnformatCurrency"
import { Line } from "../style"

const StartEndTill = ({ 
    value, 
    setValue, 
    children,
    label
}) => {

    const { neutralColor, primaryColor } = theme

    const handleChange = e => {
        const value = e.target.value
        const numericValue = unformatCurrency(value) / 100

        setValue(formatCurrency(numericValue, "BRL"))
    }

    return <>
        <div>
            <Line textcolor={neutralColor}>{children}</Line>
            <TextInput 
                width={210}
                borderColor={primaryColor}
                value={value}
                setValue={handleChange}
                label={label}
                textColor={neutralColor}
                placeholder={"Valor (R$)"}
            />
        </div>
    </>
}

export default StartEndTill