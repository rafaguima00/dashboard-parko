import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export const InfoProvider = ({ children }) => {

    const [dataClient, setDataClient] = useState({});
    const [park, setPark] = useState({});
    const [colaborators, setColaborators] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [debts, setDebts] = useState([]);
    const [priceTable, setPriceTable] = useState({});
    const [selectedClient, setSelectedClient] = useState({});
    const [ratings, setRatings] = useState([]);

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
        setRatings
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}