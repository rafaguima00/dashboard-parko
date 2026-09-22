import { theme } from "../../../theme/theme"
import { Back, Div, Label } from "../style"
import { FaArrowLeft } from "react-icons/fa6"

const TitleArea = ({ message, title, arrow = false, ...rest }) => {

    const { neutralColor } = theme

    return <>
        <Div textcolor={neutralColor}>
            {arrow &&
                <Back {...rest}>
                    <FaArrowLeft color={neutralColor} size={20} />
                </Back>
            }
            <p>{title}</p>
            <Label>{message}</Label>
        </Div>
    </>
}

export default TitleArea