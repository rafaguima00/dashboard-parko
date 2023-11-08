import { createContext, useState } from "react";

export const GlobalContext = createContext({})

export const InfoProvider = ({ children }) => {

    const [dataClient, setDataClient] = useState({
        username: '',
        email: '',
        password: '',
        login: '',
        logout: ''
    })

    const [selectedClient, setSelectedClient] = useState({
        id: 0,
        idClient: 0,
        name: "",
        clock: "",
        dateEntry: "",
        dateExit: "",
        vehicle: "",
        lisencePlate: "",
        value: 0,
        debt: 0
    })

    const value = {
        dataClient, setDataClient, selectedClient, setSelectedClient
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}