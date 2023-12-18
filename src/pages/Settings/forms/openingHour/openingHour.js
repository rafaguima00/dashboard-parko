import TopForm from "../../components/topForm";
import { 
    ContainerForm, 
    FormItem, 
    Span,
    Header, 
    Div,
    Item,
    Table,
    WeekDay,
    Checkbox,
    Time,
    DateStyle,
    DivButton
} from "../style";
//import { useContext } from "react";
//import { ParkingContext } from "../../../../context/parkingContext";
import Top from "../../../../components/top/top";
import GlobalButton from "../../../../components/button/button";
import { theme } from "../../../../theme/theme";
import { useState } from "react";

const FormOpening = () => {

    const date = new Date().toLocaleDateString();

    //const { openHour, closeHour, setOpenHour, setCloseHour } = useContext(ParkingContext);

    const { cancelColor, greenColor, neutralColor, primaryColor } = theme;

    const [checked, setChecked] = useState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
    });

    const table = [
        {
            id: 0,
            week: "Segunda-feira",
            open: "",
            close: "",
            checked: checked.monday
        },
        {
            id: 1,
            week: "Terça-feira",
            open: "",
            close: "",
            checked: checked.tuesday
        },
        {
            id: 2,
            week: "Quarta-feira",
            open: "",
            close: "",
            checked: checked.wednesday
        },
        {
            id: 3,
            week: "Quinta-feira",
            open: "",
            close: "",
            checked: checked.thursday
        },
        {
            id: 4,
            week: "Sexta-feira",
            open: "",
            close: "",
            checked: checked.friday
        },
        {
            id: 5,
            week: "Sábado",
            open: "",
            close: "",
            checked: checked.saturday
        },
        {
            id: 6,
            week: "Domingo",
            open: "",
            close: "",
            checked: checked.sunday
        }
    ]

    return (
        <ContainerForm>
            <TopForm children="Horário de Funcionamento" />
            <FormItem>
                <Span>
                    <Header>
                        <Item gridcolumn={2} textcolor={neutralColor} justify>Fechado?</Item>
                        <Item gridcolumn={3} textcolor={neutralColor}>De</Item>
                        <Item gridcolumn={4} textcolor={neutralColor}>Até</Item>
                    </Header>
                </Span>
                <Span>
                    <Table>
                        {table.map(item => (
                            <Div key={item.id}>
                                <WeekDay textcolor={neutralColor}>{item.week}</WeekDay>
                                <Checkbox type="checkbox" checked={item.checked} onChange={e => setChecked(!e.target.value)} />
                                <Time type="time" bordercolor={primaryColor} />
                                <Time type="time" bordercolor={primaryColor} />
                            </Div>
                        ))}
                    </Table>
                </Span>
                <Span>
                    <Top children="Horário Especial" fontsize={19} />
                    <Header>
                        <Item gridcolumn={1} textcolor={neutralColor}>Data</Item>
                        <Item gridcolumn={2} textcolor={neutralColor} justify={true}>Fechado?</Item>
                        <Item gridcolumn={3} textcolor={neutralColor}>De</Item>
                        <Item gridcolumn={4} textcolor={neutralColor}>Até</Item>
                    </Header>
                    <Div>
                        <DateStyle type="date" min={date} />
                        <Checkbox type="checkbox" />
                        <Time type="time" bordercolor={primaryColor} />
                        <Time type="time" bordercolor={primaryColor} />
                    </Div>
                </Span>
            </FormItem>
            <DivButton>
                <GlobalButton 
                    children="Cancelar"
                    background={cancelColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                />
                <GlobalButton 
                    children="Salvar"
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                />
            </DivButton>
        </ContainerForm>
    )
}

export default FormOpening;