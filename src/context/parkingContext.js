import { createContext, useContext, useState } from "react"

const ParkingContext = createContext({})

export const ParkProvider = ({ children }) => {

    const [openHour, setOpenHour] = useState({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    })

    const [closeHour, setCloseHour] = useState({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    })

    const [checked, setChecked] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: true
    })

    const value = { 
        openHour, 
        setOpenHour, 
        closeHour,
        setCloseHour,
        checked, 
        setChecked
    }

    return (
        <ParkingContext.Provider value={value}>
            {children}
        </ParkingContext.Provider>
    )
}

export const useParking = () => useContext(ParkingContext)