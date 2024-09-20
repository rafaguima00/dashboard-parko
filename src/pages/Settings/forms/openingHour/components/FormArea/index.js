import {
    FormItem, 
    Span,
    Header,
    PriceTableOf, 
    Div,
    Item,
    Table,
    WeekDay,
    Checkbox,
    Time,
    DateStyle,
    Add
} from "../../style"
import Top from "../../../../../../components/Top"

const FormArea = (props) => {

    const { neutralColor, primaryColor, setChecked, table, date } = props

    const handleAdd = (e) => {
        e.preventDefault()
    }

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
                        <PriceTableOf key={item.id}>
                            <WeekDay textcolor={neutralColor}>
                                {item.week}
                            </WeekDay>
                            <Checkbox type="checkbox" checked={item.checked} onChange={() => setChecked(!item.checked)} />
                            <Time 
                                type="time" 
                                bordercolor={primaryColor} 
                                value={item.open} 
                                disabled={item.checked === true ? true : false} 
                                onChange={e => item.onChangeOpen(e)}
                            />
                            <Time 
                                type="time" 
                                bordercolor={primaryColor} 
                                value={item.close} 
                                disabled={item.checked === true ? true : false} 
                                onChange={e => item.onChangeClose(e)}
                            />
                        </PriceTableOf>
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
                    {/* Por enquanto, desabilitado */}
                    <div>
                        <DateStyle type="date" min={date} disabled={true} />
                        <Checkbox type="checkbox" disabled={true}/>
                        <Time type="time" bordercolor={primaryColor} disabled={true} />
                        <Time type="time" bordercolor={primaryColor} disabled={true} />
                    </div>
                    <Add onClick={handleAdd}>+</Add>
                </Div>
            </Span>
        </FormItem>
    )
}

export default FormArea