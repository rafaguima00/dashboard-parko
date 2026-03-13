import { Container } from "./style"
import { useEffect, useState } from "react"
import { buttons } from "./map/buttons"
import { blockquote } from "./map/blockquote"
import GridOne from "./components/GridOne"
import GridTwo from "./components/GridTwo"
import { useUser } from "../../context/globalContext"
import ErrorPage from "../Error"
import { unLoggedIn } from "../../mocks/errorPage"
import usePark from "../../hooks/usePark"

const Management = () => {

    const { unauthorized, dataClient } = useUser()
    
    const { fetchPark } = usePark()

    const [bqSelected, setBqSelected] = useState(0)

    useEffect(() => {
        if (dataClient.id_establishment) fetchPark()
    }, [dataClient])

    if (unauthorized) {
        return <ErrorPage errorMsg={unLoggedIn} />
    }

    return (
        <Container>
            <GridOne 
                buttons={buttons}
                blockquote={blockquote}
                states={{ bqSelected, setBqSelected }}
            />
            <GridTwo bqSelected={bqSelected} />
        </Container>
    )
}

export default Management