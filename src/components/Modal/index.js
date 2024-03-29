import { 
    Background, 
    Content, 
    Header, 
    Spacing, 
    FormArea, 
    DivButton 
} from "./style";
import GlobalButton from "../Button";
import { theme } from "../../theme/theme";

function Modal({ 
    isOpen,
    setOpen,
    title,
    children,
    maxWidth,
    funcao
}) {

    const { greenColor, cancelColor, primaryColor } = theme;

    if(isOpen) {
        return (
            <Background>
                <Content maxwidth={maxWidth}>
                    <Header background={primaryColor}>
                        <p>{title}</p>
                    </Header>
                    <Spacing>
                        <FormArea>
                            {children}
                        </FormArea>
                        <DivButton>
                            <GlobalButton 
                                children={"Cancelar"} 
                                background={cancelColor} 
                                aoPressionar={() => setOpen(false)}
                                largura={"12rem"}
                                altura={"2.8rem"}
                            />
                            <GlobalButton 
                                children={"Salvar"} 
                                background={greenColor} 
                                aoPressionar={funcao}
                                largura={"12rem"}
                                altura={"2.8rem"}
                            />
                        </DivButton>
                    </Spacing>
                </Content>
            </Background>
        )
    }
}

export default Modal;