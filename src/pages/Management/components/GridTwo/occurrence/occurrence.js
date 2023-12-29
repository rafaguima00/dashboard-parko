import { Div } from "./style";
import { theme } from "../../../../../theme/theme";
import Register from "./components/register";
import FormOcurrence from "./components/formOcurrence";

const Occurrence = () => {

    const { primaryColor, neutralColor, cancelColor, greenColor } = theme;

    return (
        <Div>
            <Register primaryColor={primaryColor} neutralColor={neutralColor} />
            <FormOcurrence colors={{ cancelColor, greenColor, primaryColor }} />
        </Div>
    )
}

export default Occurrence;