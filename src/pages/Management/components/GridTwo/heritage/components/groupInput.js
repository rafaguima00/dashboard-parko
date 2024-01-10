import { SlPrinter } from "react-icons/sl";
import { HiOutlinePlus } from "react-icons/hi";
import { Button } from "../../../../style";
import { GroupInput, InputSearch } from "../style";

const InputGroup = (props) => {

    const { neutralColor, primaryColor, setNewItem } = props;

    return (
        <GroupInput>
            <Button 
                background={"#f4f4f4"} 
                paddingright={".5rem"} 
                paddingleft={".5rem"}
                borderradius={".5rem"}
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
            <InputSearch type="text" placeholder="Procurar" inputcolor={primaryColor}/>
        </GroupInput>
    )
}

export default InputGroup;