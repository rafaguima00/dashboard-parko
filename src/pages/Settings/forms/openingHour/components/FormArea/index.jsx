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
    Add,
    DivColumn,
    DivRow
} from "../../style"
import Top from "../../../../../../components/Top"
import { useState } from "react"

const FormArea = (props) => {

    const { neutralColor, primaryColor, setTable, table, date } = props

    const [linha, setLinha] = useState(1)

    const handleAdd = (e) => {
        e.preventDefault()
        setLinha((prevLinha) => prevLinha + 1)
    }

    const renderItem = () => {
        return Array.from({ length: linha }, (_, i) => (
            <DivRow key={i}>
                <DateStyle bordercolor={primaryColor} type="date" min={date} />
                <Checkbox type="checkbox" />
                <Time type="time" bordercolor={primaryColor} />
                <Time type="time" bordercolor={primaryColor} />
            </DivRow>
        ))
    }

    return (
        <FormItem>
            <Span>
                <Header>
                    <p></p>
                    <Item textcolor={neutralColor} justify>Fechado?</Item>
                    <Item textcolor={neutralColor}>De</Item>
                    <Item textcolor={neutralColor}>Até</Item>
                </Header>
            </Span>
            <Span>
                <Table>
                    {table.map(item => (
                        <PriceTableOf key={item.id}>
                            <WeekDay textcolor={neutralColor}>
                                {item.week}
                            </WeekDay>
                            <Checkbox
                                type="checkbox"
                                checked={item.closed}
                                onChange={(e) => {
                                    const novoValor = e.target.checked
                                    setTable(prev =>
                                        prev.map(d =>
                                            d.id === item.id ? { ...d, closed: novoValor } : d
                                        )
                                    )
                                }}
                            />

                            <Time 
                                type="time" 
                                bordercolor={primaryColor} 
                                value={item.open} 
                                disabled={item.closed}
                                onChange={e =>
                                    setTable(prev =>
                                        prev.map(d =>
                                            d.id === item.id ? { ...d, open: e.target.value } : d
                                        )
                                    )
                                }
                            />

                            <Time 
                                type="time" 
                                bordercolor={primaryColor} 
                                value={item.close} 
                                disabled={item.closed}
                                onChange={e =>
                                    setTable(prev =>
                                        prev.map(d =>
                                            d.id === item.id ? { ...d, close: e.target.value } : d
                                        )
                                    )
                                }
                            />
                        </PriceTableOf>
                    ))}
                </Table>
            </Span>
            <Span>
                <Top children="Horário Especial" fontsize={19} />
                <Header>
                    <Item textcolor={neutralColor}>Data</Item>
                    <Item textcolor={neutralColor}>Fechado?</Item>
                    <Item textcolor={neutralColor}>De</Item>
                    <Item textcolor={neutralColor}>Até</Item>
                    <p></p>
                </Header>
                <Div>
                    <DivColumn>
                        {renderItem()}
                    </DivColumn>
                    <Add onClick={handleAdd}>+</Add>
                </Div>
            </Span>
        </FormItem>
    )
}

export default FormArea