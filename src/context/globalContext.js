import { createContext, useState, useContext } from "react";

const GlobalContext = createContext({});

export const InfoProvider = ({ children }) => {

    const [dataClient, setDataClient] = useState({});
    const [park, setPark] = useState({});
    const [colaborators, setColaborators] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [debts, setDebts] = useState([]);
    const [priceTable, setPriceTable] = useState({});
    const [selectedClient, setSelectedClient] = useState({});
    const [ratings, setRatings] = useState([]);
    const [occurrences, setOccurrences] = useState([]);
    const [patrimonio, setPatrimonio] = useState([]);
    const [accounts, setAccounts] = useState([]);

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
        setAccounts
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useUser = () => useContext(GlobalContext);