import { Container } from "./style"
import { theme } from "../../theme/theme"
import { useEffect, useState } from "react"
import { buttons } from "./map/buttons"
import { blockquote } from "./map/blockquote"
import GridOne from "./components/GridOne"
import GridTwo from "./components/GridTwo"
import { jwtDecode } from "jwt-decode"
import { useUser } from "../../context/globalContext"
import ReadApi from "../../services/readData"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"

const Management = () => {

    const { neutralColor, primaryColor } = theme
    const { setDataClient, dataClient, selected, setSelected } = useUser()
    const { loadData } = ReadApi()

    const [bqSelected, setBqSelected] = useState(0)
    const [unauthorized, setUnauthorized] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        } else {
            setUnauthorized(true)
        }
    }, [])

    useEffect(() => {
        loadData(dataClient.id_establishment)
    }, [dataClient])

    if (unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <GridOne 
                buttons={buttons}
                blockquote={blockquote}
                colors={{ neutralColor, primaryColor }}
                states={{ selected, setSelected, bqSelected, setBqSelected }}
            />
            <GridTwo states={{ selected, bqSelected }}/>
        </Container>
    )
}

export default Management