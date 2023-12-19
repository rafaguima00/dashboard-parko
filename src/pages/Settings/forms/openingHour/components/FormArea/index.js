import {
    FormItem, 
    Span,
    Header, 
    Div,
    Item,
    Table,
    WeekDay,
    Checkbox,
    Time,
    DateStyle
} from "../../style";
import Top from "../../../../../../components/top/top";

const FormArea = (props) => {

    const { neutralColor, primaryColor, setChecked, table, date } = props;

    return (
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
                            <Checkbox type="checkbox" checked={item.checked} onChange={e => setChecked(!e.target.value)}/>
                            <Time type="time" bordercolor={primaryColor} value={item.open} onChange={e => item.onChangeOpen(e)}/>
                            <Time type="time" bordercolor={primaryColor} value={item.close} onChange={e => item.onChangeClose(e)}/>
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
    )
}

export default FormArea;