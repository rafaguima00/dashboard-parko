import { useState, useEffect } from "react"
import { useUser } from "../../../../../context/globalContext"
import { Div, Span } from "../../../style"
import { theme } from "../../../../../theme/theme"
import InputGroup from "./components/groupInput"
import TableAccount from "./components/table"
import Modal from "../../../../../components/Modal"
import NewHeritage from "./form/new"
import EditHeritage from "./form/edit"
import api from "../../../../../services/api/server"

const Heritage = () => {
    const { patrimonio, setPatrimonio, dataClient } = useUser()
    const { neutralColor, primaryColor } = theme

    const [newItem, setNewItem] = useState(false)
    const [editItem, setEditItem] = useState(false)
    const [chosenItem, setChosenItem] = useState({})
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    const readPatrimonio = async () => {
        await api.get("/heritage")
        .then(res => {
            setPatrimonio(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const createPatrimonio = async (e) => {
        e.preventDefault()
        setLoading(true)

        await api.post("/heritage", {
            code: chosenItem.code, 
            name: chosenItem.name, 
            category: chosenItem.category, 
            date_registry: chosenItem.date_registry, 
            quantity: chosenItem.quantity, 
            unit_measurement: chosenItem.unit_measurement, 
            value: chosenItem.value, 
            id_establishment: dataClient.id_establishment
        })
        .then(() => {
            alert("Criado com sucesso")
            setLoading(false)
            setNewItem(false)
        })
        .catch(e => {
            console.log(e)
            setLoading(false)
        })
    }

    const updatePatrimonio = async (e) => {
        e.preventDefault()
        setLoading(true)

        await api.put(`/heritage/${chosenItem.id}`, chosenItem)
        .then(() => {
            alert("Atualizado com sucesso")
            setEditItem(false)
            setLoading(false)
        })
        .catch(e => {
            console.log(e)
            setLoading(false)
        }) 
    }

    const filtrar = patrimonio.filter(item => item.id_establishment === dataClient.id_establishment)
    const filtrarPatrimonio = filtrar.filter(
        item => item.category.toLowerCase().includes(text.toLowerCase()) || 
        item.name.toLowerCase().includes(text.toLowerCase())
    )

    useEffect(() => { readPatrimonio() }, [patrimonio])

    return (
        <Span>
            <Div height={100}>
                {/* input superior */}
                <InputGroup 
                    neutralColor={neutralColor} 
                    primaryColor={primaryColor} 
                    state={{ text, setText, setNewItem }}
                />
                
                {/* lista de itens do patrimônio */}
                <TableAccount 
                    neutralColor={neutralColor} 
                    setEditItem={setEditItem} 
                    setChosenItem={setChosenItem}
                    filtrarPatrimonio={filtrarPatrimonio}
                />

                <Modal
                    isOpen={newItem}
                    setOpen={setNewItem}
                    title={"Novo Patrimônio"}
                    maxWidth={"52rem"}
                    funcao={createPatrimonio}
                    isLoading={loading}
                >
                    <NewHeritage 
                        colors={{ primaryColor, neutralColor }} 
                        state={{ chosenItem, setChosenItem, patrimonio }} 
                    />
                </Modal>
                <Modal
                    isOpen={editItem}
                    setOpen={setEditItem}
                    title={"Editar Patrimônio"}
                    maxWidth={"52rem"}
                    funcao={updatePatrimonio}
                    isLoading={loading}
                >
                    <EditHeritage 
                        colors={{ primaryColor, neutralColor }} 
                        state={{ chosenItem, setChosenItem, patrimonio }} 
                    />
                </Modal>
            </Div>
        </Span>
    )
}

export default Heritage