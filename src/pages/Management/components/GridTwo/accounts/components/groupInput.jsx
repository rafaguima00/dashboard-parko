import { SlPrinter } from "react-icons/sl"
import { HiOutlinePlus } from "react-icons/hi"
import { Button } from "../../../../style"
import { GroupInput, InputSearch } from "../style"
import { GoCalendar } from "react-icons/go"

const InputGroup = (props) => {

    const { 
        neutralColor, 
        primaryColor, 
        setCount, 
        setText,
        exportData,
        setFilterDate
    } = props

    return (
        <GroupInput>
            <Button 
                background={"#f4f4f4"} 
                paddingright={".5rem"} 
                paddingleft={".5rem"}
                borderradius={".5rem"}
                onClick={() => setFilterDate(true)}
            >
                <GoCalendar size={19} color={neutralColor}/>
            </Button>
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
                onClick={() => setCount(true)}
            >
                <HiOutlinePlus size={19} color="#fff"/>
            </Button>
            <InputSearch 
                type="text" 
                placeholder="Procurar" 
                inputcolor={primaryColor}
                onChange={e => setText(e.target.value)}
            />
        </GroupInput>
    )
}

export default InputGroup