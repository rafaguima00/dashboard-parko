import { Bounce } from "react-activity"
import "react-activity/dist/library.css"
import GlobalButton from "../../../../../../components/Button"
import { DivButton } from "../../../style"
import { useNavigate } from "react-router-dom"

const BottomButton = (props) => {

    const { cancelColor, greenColor, recuperarDados, loading } = props

    const navigate = useNavigate()

    const screenBack = () => {
        return navigate("/settings")
    }

    return (
        <DivButton>
            <GlobalButton 
                children="Cancelar"
                background={cancelColor}
                largura={"12rem"}
                altura={"2.8rem"}
                aoPressionar={screenBack}
            />
            <GlobalButton 
                children={loading ? <Bounce color="#f4f4f4" /> : "Salvar"}
                background={greenColor}
                largura={"12rem"}
                altura={"2.8rem"}
                aoPressionar={recuperarDados}
            />
        </DivButton>
    )
}

export default BottomButton