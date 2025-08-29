import { SlPrinter } from "react-icons/sl"
import { HiOutlinePlus } from "react-icons/hi"
import { Button } from "../../../../style"
import { GroupInput, InputSearch } from "../style"

const InputGroup = (props) => {

    const { neutralColor, primaryColor, exportData } = props
    const { text, setText, setNewItem } = props.state

    return (
        <GroupInput>
            <Button 
                background={"#f4f4f4"} 
                paddingright={".5rem"} 
                paddingleft={".5rem"}
                borderradius={".5rem"}
                onClick={exportData}
            >
                <SlPrinter size={19} color={neutralColor}/>
            </Button>

            <Button 
                background={primaryColor} 
                paddingright={".5rem"} 
                paddingleft={".5rem"}
                borderradius={".5rem"}
                onClick={() => setNewItem(true)}
            >
                <HiOutlinePlus size={19} color="#fff"/>
            </Button>

            <InputSearch 
                type="text" 
                placeholder="Procurar" 
                inputcolor={primaryColor}
                value={text}
                onChange={e => setText(e.target.value)}
            />
        </GroupInput>
    )
}

export default InputGroup