import { Column, InputArea, Label } from "../style"

const RadioArea = (props) => {

    const { typeCharge, setTypeCharge } = props.states
    
    const changeTypeCharge = e => {
        setTypeCharge(e.target.value)
    }

    return <>
        <Column>
            <Label bold>Selecione o tipo de cobrança:</Label>
            <InputArea>
                <div>
                    <input 
                        type="radio"
                        name="charge"
                        value="hora_fracao"
                        onChange={changeTypeCharge}
                        checked={typeCharge === "hora_fracao" ? true : false}
                    />
                    <Label font={14} textcolor={"#7d7d7d"}>Hora e fração da hora</Label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="charge" 
                        value="tabela_fixa"
                        onChange={changeTypeCharge} 
                        checked={typeCharge === "tabela_fixa" ? true : false}
                    />
                    <Label font={14} textcolor={"#7d7d7d"}>Tabela fixa</Label>
                </div>
            </InputArea>
        </Column>
    </>
}

export default RadioArea