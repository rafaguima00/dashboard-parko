import api from "./api/server"
import { useUser } from "../context/globalContext"

const ReadApi = () => {

    const { 
        setReservations, 
        setPark, 
        setColaborators, 
        setAportes, 
        setRetiradas,
        setPriceTable,
        setDebts,
        setTabelaFixa
    } = useUser()

    const listReservations = async (id) => {
        await api.get(`/reservations/parking/${id}`)
        .then(response => {
            setReservations(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const loadData = async (id) => {
        await api.get(`/establishments/${id}`)
        .then(response => {
            setPark(response.data[0])
        })
        .catch(e => {
            console.log(e)
        })
    }

    const listColaborators = async (id) => {
        await api.get(`/colaborators/${id}`)
        .then(response => {
            setColaborators(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const readAportes = async () => {
        await api.get("/aportes")
        .then(response => {
            setAportes(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const readRetiradas = async () => {
        await api.get("/retiradas")
        .then(response => {
            setRetiradas(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const getPriceTable = async (id) => {

        await api.get(`/tabela_preco/${id}`)
        .then(res => {
            setPriceTable(res.data[0])
        }) 
        .catch(e => {
            console.log(e)
        })
    }

    const listDividas = async () => {
        await api.get("/debts")
        .then(res => {
            setDebts(res.data)
        })
        .catch(e => {
            alert(e.response.data.message)
        })
    }

    const getTabelaFixa = async (id) => {

        // id do estacionamento como parâmetro
        await api.get(`/tabela_fixa/${id}`)
        .then(res => {
            setTabelaFixa(res.data)
        })
        .catch(e => {
            return e
        })
    }
    
    return { 
        listReservations, 
        loadData, 
        listColaborators, 
        readAportes, 
        readRetiradas,
        getPriceTable,
        listDividas,
        getTabelaFixa
    }
}

export default ReadApi