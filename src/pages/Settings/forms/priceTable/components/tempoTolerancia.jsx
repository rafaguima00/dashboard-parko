import { theme } from "../../../../../theme/theme"
import { unformatCurrency } from "../../../../../utils/UnformatCurrency"
import { InputArea, InputNumber, Label, Row } from "../style"

const TempoTolerancia = (props) => {

    const { value, formTable, setFormTable, setValue } = props.states
    const { primaryColor } = theme

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    return <>
        <Row>
            <Label>Há tempo de tolerância em seu estabelecimento?</Label>
            <InputArea>
                <div>
                    <input
                        type="radio"
                        name="tolerance"
                        value="yes"
                        onChange={handleOnChange}
                        checked={value === "yes" ? true : false}
                    />
                    <Label font={14} textcolor={"#7d7d7d"}>Sim</Label>
                </div>
                <div>
                    <input 
                        type="radio"
                        name="tolerance"
                        value="no"
                        onChange={handleOnChange}
                        checked={value === "no" ? true : false}
                    />
                    <Label font={14} textcolor={"#7d7d7d"}>Não</Label>
                </div>
            </InputArea>
        </Row>
        <Row>
            <Label>Qual o tempo de tolerância do seu estabelecimento? (minutos)</Label>
            <InputArea>
                <InputNumber 
                    bordercolor={primaryColor} 
                    type="text"
                    placeholder="00:10" 
                    disabled={value === "yes" ? false : true}
                    value={formTable.tempo_tolerancia}
                    onChange={e => setFormTable({ ...formTable, tempo_tolerancia: unformatCurrency(e.target.value) })}
                />
            </InputArea>
        </Row>
    </>
}

export default TempoTolerancia