import { Div, Span } from "../../../style"
import { theme } from "../../../../../theme/theme"
import InputGroup from "./components/groupInput"
import TableAccount from "./components/table"
import Modal from "../../../../../components/Modal"
import { useState, useEffect } from "react"
import { useUser } from "../../../../../context/globalContext"
import FilterDate from "./form/filterDate"
import NovaConta from "./form/novaConta"
import api from "../../../../../services/api/server"

const Accounts = () => {

    const { accounts, setAccounts, dataClient } = useUser()
    const { neutralColor, primaryColor } = theme

    const [filterDate, setFilterDate] = useState(false)
    const [count, setCount] = useState(false)
    const [text, setText] = useState("")
    const [chosenAcc, setChosenAcc] = useState({})
    const [radioValue, setRadioValue] = useState("")
    const [cost, setCost] = useState("")
    const [loading, setLoading] = useState(false)

    const verifyCategory = async (acc) => {
        const { category, value, desc_item, date_created } = acc

        if(category === "Aporte") {
            await api.post("/aportes", {
                id_establishment: dataClient.id_establishment,
                id_colaborator: dataClient.id,
                created_at: date_created,
                value: value,
                description: desc_item
            })
            .then(() => {
                console.log("Aporte realizado")
                setLoading(false)
                setCount(false)
            })
            .catch(e => {
                console.log("Erro ao realizar aporte")
                setLoading(false)
            })
        }

        if(category === "Retirada") {
            await api.post("/retiradas", {
                id_establishment: dataClient.id_establishment,
                id_colaborator: dataClient.id,
                created_at: date_created,
                value: value,
                description: desc_item
            })
            .then(() => {
                console.log("Retirada realizada")
                setLoading(false)
                setCount(false)
            })
            .catch(e => {
                console.log("Erro ao realizar retirada")
                setLoading(false)
            })
        }
    }

    const readAccounts = async () => {
        await api.get("/accounts")
        .then(res => {
            setAccounts(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const createAccounts = async (e) => {
        e.preventDefault()
        setLoading(true)

        await api.post("/accounts", {
            category: chosenAcc.category, 
            desc_item: chosenAcc.desc_item, 
            value: chosenAcc.value, 
            date_created: chosenAcc.date_created, 
            date_payment: chosenAcc.date_payment, 
            status: radioValue, 
            cost: cost, 
            id_establishment: dataClient.id_establishment
        })
        .then(() => {
            verifyCategory(chosenAcc)
        })
        .then(() => {
            alert("Criado com sucesso")
            setLoading(false)
            setCount(false)
        })
        .catch(e => {
            setLoading(false)
            console.log(e)
        })
    }

    const filtrarData = async (e) => {
        e.preventDefault()
        setLoading(true)
    }

    const filtrar = accounts.filter(item => item.id_establishment === dataClient.id_establishment)
    const filterAccounts = filtrar.filter(
        item => item.category.toLowerCase().includes(text.toLowerCase()) || 
        item.desc_item.toLowerCase().includes(text.toLowerCase()) || 
        item.date_created.includes(text)
    )

    useEffect(() => { readAccounts() }, [accounts])

    return (
        <Span>
            <Div height={100}>
                <InputGroup 
                    neutralColor={neutralColor} 
                    primaryColor={primaryColor} 
                    setFilterDate={setFilterDate} 
                    setCount={setCount}
                    setText={setText}
                />
                <TableAccount 
                    neutralColor={neutralColor}
                    state={{ accounts }}
                    filterAccounts={filterAccounts}
                />
                <Modal
                    isOpen={filterDate}
                    setOpen={setFilterDate}
                    title={"Filtrar Datas"}
                    maxWidth={"30rem"}
                    funcao={filtrarData}
                    isLoading={loading}
                >
                    <FilterDate colors={{ primaryColor, neutralColor }} />
                </Modal>
                <Modal
                    isOpen={count}
                    setOpen={setCount}
                    title={"Nova Conta"}
                    maxWidth={"52rem"}
                    funcao={createAccounts}
                    isLoading={loading}
                >
                    <NovaConta 
                        colors={{ primaryColor, neutralColor }}
                        state={{ chosenAcc, setChosenAcc, setRadioValue, setCost }} 
                    />
                </Modal>
            </Div>
        </Span>
    )
}

export default Accounts