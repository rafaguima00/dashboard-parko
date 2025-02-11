import { createContext, useState, useContext } from "react"

const GlobalContext = createContext({})

export const InfoProvider = ({ children }) => {

    const [dataClient, setDataClient] = useState({})
    const [park, setPark] = useState({})
    const [colaborators, setColaborators] = useState([])
    const [reservations, setReservations] = useState([])
    const [debts, setDebts] = useState([])
    const [priceTable, setPriceTable] = useState({})
    const [tabelaFixa, setTabelaFixa] = useState([])
    const [selectedClient, setSelectedClient] = useState({})
    const [ratings, setRatings] = useState([])
    const [occurrences, setOccurrences] = useState([])
    const [patrimonio, setPatrimonio] = useState([])
    const [accounts, setAccounts] = useState([])
    const [aportes, setAportes] = useState([])
    const [retiradas, setRetiradas] = useState([])
    const [caixaAberto, setCaixaAberto] = useState({})
    const [requests, setRequests] = useState([])

    const value = {
        dataClient, 
        setDataClient, 
        selectedClient, 
        setSelectedClient,
        park, 
        setPark,
        colaborators,
        setColaborators,
        reservations,
        setReservations,
        debts,
        setDebts,
        priceTable,
        setPriceTable,
        ratings,
        setRatings,
        occurrences,
        setOccurrences,
        patrimonio,
        setPatrimonio,
        accounts,
        setAccounts,
        aportes,
        setAportes,
        retiradas,
        setRetiradas,
        tabelaFixa,
        setTabelaFixa,
        caixaAberto,
        setCaixaAberto,
        requests,
        setRequests
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useUser = () => useContext(GlobalContext)