import { createContext, useState } from "react";

export const ParkingContext = createContext({});

export const ParkProvider = ({ children }) => {

    const [openHour, setOpenHour] = useState({
        monday: {
            hour: "08",
            minute: "00"
        },
        tuesday: {
            hour: "09",
            minute: "30"
        },
        wednesday: {
            hour: "09",
            minute: "30"
        },
        thursday: {
            hour: "09",
            minute: "30"
        },
        friday: {
            hour: "09",
            minute: "30"
        },
        saturday: {
            hour: "09",
            minute: "30"
        },
        sunday: {
            hour: "09",
            minute: "30"
        }
    });

    const [closeHour, setCloseHour] = useState({
        monday: {
            hour: "22",
            minute: "00"
        },
        tuesday: {
            hour: "22",
            minute: "00"
        },
        wednesday: {
            hour: "22",
            minute: "00"
        },
        thursday: {
            hour: "22",
            minute: "00"
        },
        friday: {
            hour: "22",
            minute: "00"
        },
        saturday: {
            hour: "19",
            minute: "00"
        },
        sunday: {
            hour: "18",
            minute: "00"
        }
    });

    const value = { 
        openHour, setCloseHour, setOpenHour, closeHour
    };

    return (
        <ParkingContext.Provider value={value}>
            {children}
        </ParkingContext.Provider>
    )
}