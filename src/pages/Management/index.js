import { Container } from "./style";
import { theme } from "../../theme/theme";
import { useState } from "react";
import { buttons } from "./map/buttons";
import { blockquote } from "./map/blockquote";
import GridOne from "./components/GridOne";
import GridTwo from "./components/GridTwo";

const Management = () => {

    const { neutralColor, primaryColor } = theme;

    const [selected, setSelected] = useState(3);
    const [bqSelected, setBqSelected] = useState(0);

    return (
        <Container>
            <GridOne 
                buttons={buttons}
                blockquote={blockquote}
                colors={{ neutralColor, primaryColor }}
                states={{ selected, setSelected, bqSelected, setBqSelected }}
            />
            <GridTwo states={{ selected, bqSelected }}/>
        </Container>
    )
}

export default Management;