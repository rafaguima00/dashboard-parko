import TopForm from "../../components/topForm";
import { ContainerForm } from "../style";
import { useContext } from "react";
import { ParkingContext } from "../../../../context/parkingContext";
import { theme } from "../../../../theme/theme";
import FormArea from "./components/FormArea";
import BottomButton from "./components/BottomButton";

const FormOpening = () => {

    const date = new Date().toLocaleDateString();

    const { 
        openHour, 
        closeHour, 
        setOpenHour, 
        setCloseHour, 
        setChecked, 
        checked 
    } = useContext(ParkingContext);

    const { 
        cancelColor, 
        greenColor, 
        neutralColor, 
        primaryColor 
    } = theme;

    const table = [
        {
            id: 0,
            week: "Segunda-feira",
            open: openHour.monday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, monday: e.target.value }),
            close: closeHour.monday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, monday: e.target.value }),
            checked: checked.monday
        },
        {
            id: 1,
            week: "Terça-feira",
            open: openHour.tuesday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, tuesday: e.target.value }),
            close: closeHour.tuesday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, tuesday: e.target.value }),
            checked: checked.tuesday
        },
        {
            id: 2,
            week: "Quarta-feira",
            open: openHour.wednesday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, wednesday: e.target.value }),
            close: closeHour.wednesday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, wednesday: e.target.value }),
            checked: checked.wednesday
        },
        {
            id: 3,
            week: "Quinta-feira",
            open: openHour.thursday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, thursday: e.target.value }),
            close: closeHour.thursday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, thursday: e.target.value }),
            checked: checked.thursday
        },
        {
            id: 4,
            week: "Sexta-feira",
            open: openHour.friday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, friday: e.target.value }),
            close: closeHour.friday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, friday: e.target.value }),
            checked: checked.friday
        },
        {
            id: 5,
            week: "Sábado",
            open: openHour.saturday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, saturday: e.target.value }),
            close: closeHour.saturday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, saturday: e.target.value }),
            checked: checked.saturday
        },
        {
            id: 6,
            week: "Domingo",
            open: openHour.sunday,
            onChangeOpen: (e) => setOpenHour({ ...openHour, sunday: e.target.value }),
            close: closeHour.sunday,
            onChangeClose: (e) => setCloseHour({ ...closeHour, sunday: e.target.value }),
            checked: checked.sunday
        }
    ]

    return (
        <ContainerForm>
            <TopForm children="Horário de Funcionamento" />
            <FormArea 
                neutralColor={neutralColor} 
                primaryColor={primaryColor} 
                table={table}
                setChecked={setChecked}
                date={date}
            />
            <BottomButton 
                cancelColor={cancelColor}
                greenColor={greenColor}
            />
        </ContainerForm>
    )
}

export default FormOpening;