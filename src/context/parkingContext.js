import { createContext, useState } from "react";

export const ParkingContext = createContext({});

export const ParkProvider = ({ children }) => {

    const [openHour, setOpenHour] = useState({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    });

    const [closeHour, setCloseHour] = useState({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    });

    const [checked, setChecked] = useState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
    });

    const value = { 
        openHour, 
        setOpenHour, 
        closeHour,
        setCloseHour,
        checked, 
        setChecked
    };

    return (
        <ParkingContext.Provider value={value}>
            {children}
        </ParkingContext.Provider>
    )
}