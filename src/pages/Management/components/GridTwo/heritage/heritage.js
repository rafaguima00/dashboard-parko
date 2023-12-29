import { Div, Span } from "../../../style";
import { theme } from "../../../../../theme/theme";
import InputGroup from "./components/groupInput";
import TableAccount from "./components/table";

const Heritage = () => {

    const { neutralColor, primaryColor } = theme;

    return (
        <Span>
            <Div height={100}>
                <InputGroup neutralColor={neutralColor} primaryColor={primaryColor}/>
                <TableAccount neutralColor={neutralColor}/>
            </Div>
        </Span>
    )
}

export default Heritage;