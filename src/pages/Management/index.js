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

const Management = () => {

    const { neutralColor, primaryColor } = theme
    const { setDataClient, dataClient, park } = useUser()
    const { listColaborators, listReservations, loadData } = ReadApi()

    const [selected, setSelected] = useState(3)
    const [bqSelected, setBqSelected] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        }
    }, [])

    useEffect(() => {
        loadData(dataClient.id_establishment)
    }, [dataClient])

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