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

const FormOpening = () => {

    const date = new Date().toLocaleDateString();

    //const { openHour, closeHour, setOpenHour, setCloseHour } = useContext(ParkingContext);

    const { cancelColor, greenColor, neutralColor, primaryColor } = theme;

    const table = [
        {
            id: 0,
            week: "Segunda-feira",
            open: "",
            close: ""
        },
        {
            id: 1,
            week: "Terça-feira",
            open: "",
            close: ""
        },
        {
            id: 2,
            week: "Quarta-feira",
            open: "",
            close: ""
        },
        {
            id: 3,
            week: "Quinta-feira",
            open: "",
            close: ""
        },
        {
            id: 4,
            week: "Sexta-feira",
            open: "",
            close: ""
        },
        {
            id: 5,
            week: "Sábado",
            open: "",
            close: ""
        },
        {
            id: 6,
            week: "Domingo",
            open: "",
            close: ""
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
                            <Div>
                                <WeekDay textcolor={neutralColor}>{item.week}</WeekDay>
                                <Checkbox type="checkbox" />
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
                        <Item gridcolumn={2} textcolor={neutralColor} justify>Fechado?</Item>
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