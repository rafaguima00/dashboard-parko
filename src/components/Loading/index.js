import { Background } from "./style"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { theme } from "../../theme/theme"

const LoadingScreen = ({ isOpen }) => {

    const { primaryColor } = theme

    if(isOpen === true) {
        return (
            <Background>
                <Spinner color={primaryColor} size={32}/>
            </Background>
        )
    }
}

export default LoadingScreen