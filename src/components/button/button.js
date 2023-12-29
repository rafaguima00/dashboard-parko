import { Button } from "./style";

const GlobalButton = ({ 
    children,
    background,
    textcolor,
    largura,
    altura,
    bold,
    btborder,
    aoPressionar
}) => {
    return (
        <Button 
            background={background}
            textcolor={textcolor}
            largura={largura}
            altura={altura}
            bold={bold}
            btborder={btborder}
            onClick={aoPressionar}
        >
            {children}
        </Button>
    )
}

export default GlobalButton;