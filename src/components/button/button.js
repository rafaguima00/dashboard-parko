import { Button } from "./style";

const GlobalButton = ({ 
    children,
    background,
    textcolor,
    largura,
    altura
}) => {
    return (
        <Button 
            background={background}
            textcolor={textcolor}
            largura={largura}
            altura={altura}
        >
            {children}
        </Button>
    )
}

export default GlobalButton;