import { useEffect } from "react"
import { Div } from "./style"
import { theme } from "../../../../../theme/theme"
import Register from "./components/register"
import FormOcurrence from "./components/formOcurrence"
import api from "../../../../../services/api/server"
import { useUser } from "../../../../../context/globalContext"

const Occurrence = (props) => {

    const { setFormActive, setOccurrenceItem } = useUser()
    const { primaryColor, neutralColor, cancelColor, greenColor } = theme
    const { occurrences, setOccurrences } = props.state
    const { dataClient } = props

    const readOccurrences = async () => {
        await api.get("/occurrence")
        .then(res => {
            setOccurrences(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }
    const selectOccurrence = occurrences.filter(item => item.id_establishment === dataClient.id_establishment)
    const formOccurrence = (item) => {
        const { id_occurrence } = item

        if(id_occurrence) {
            setFormActive(id_occurrence)
            setOccurrenceItem(item)
        }
    }

    useEffect(() => { readOccurrences() }, [occurrences])

    return (
        <Div>
            <Register 
                primaryColor={primaryColor} 
                neutralColor={neutralColor} 
                array={{ selectOccurrence }} 
                formOccurrence={formOccurrence}
            />
            <FormOcurrence 
                colors={{ 
                    cancelColor, 
                    greenColor, 
                    primaryColor 
                }} 
            />
        </Div>
    )
}

export default Occurrence