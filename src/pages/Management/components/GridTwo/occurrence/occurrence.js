import { useEffect, useState } from "react"
import { Div } from "./style"
import { theme } from "../../../../../theme/theme"
import Register from "./components/register"
import FormOcurrence from "./components/formOcurrence"
import api from "../../../../../services/api/server"

const Occurrence = (props) => {

    const [formActive, setFormActive] = useState(0)
    const [occurrenceItem, setOccurrenceItem] = useState({})

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

        if(id_occurrence === 1) {
            setFormActive(1)
        } else if(id_occurrence === 2) {
            setFormActive(2)
        } else if(id_occurrence === 3) {
            setFormActive(3)
        }
        
        setOccurrenceItem(item)
    }

    useEffect(() => { readOccurrences() }, [occurrences])

    useEffect(() => console.log(occurrenceItem), [occurrenceItem])

    return (
        <Div>
            <Register 
                primaryColor={primaryColor} 
                neutralColor={neutralColor} 
                array={{ selectOccurrence }} 
                formOccurrence={formOccurrence}
            />
            <FormOcurrence 
                colors={{ cancelColor, greenColor, primaryColor }} 
                state={{ formActive, setFormActive, occurrenceItem, setOccurrenceItem }}
            />
        </Div>
    )
}

export default Occurrence