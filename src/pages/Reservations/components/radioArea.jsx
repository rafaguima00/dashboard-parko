import { InputArea, Label, Radio, RadioAreaStyle, RadioText } from "../style"

const RadioArea = ({ children, changeNeeded, setChangeNeeded }) => {
    return <>
        <RadioAreaStyle>
            <RadioText>{children}</RadioText>
            <InputArea>
                <div>
                    <Radio
                        type="radio"
                        name="change"
                        value="yes"
                        onChange={e => setChangeNeeded(e.target.value)}
                        checked={changeNeeded === "yes" ? true : false}
                    />
                    <Label font={14} textcolor={"#7d7d7d"}>Sim</Label>
                </div>
                <div>
                    <Radio 
                        type="radio"
                        name="change"
                        value="no"
                        onChange={e => setChangeNeeded(e.target.value)}
                        checked={changeNeeded === "no" ? true : false}
                    />
                    <Label font={14} textcolor={"#7d7d7d"}>Não</Label>
                </div>
            </InputArea>
        </RadioAreaStyle>
    </>
}

export default RadioArea