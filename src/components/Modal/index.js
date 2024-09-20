import { 
    Background, 
    Content, 
    Header, 
    Spacing, 
    FormArea, 
    DivButton 
} from "./style"
import GlobalButton from "../Button"
import { theme } from "../../theme/theme"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"

function Modal({ 
    isOpen,
    setOpen,
    title,
    children,
    maxWidth,
    funcao,
    isLoading,
    aoCancelar
}) {

    const { greenColor, cancelColor, primaryColor } = theme

    const closeModal = (e) => {
        e.preventDefault()
        setOpen(false)
    }

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
                                aoPressionar={aoCancelar ? aoCancelar : closeModal}
                                largura={"12rem"}
                                altura={"2.8rem"}
                            />
                            <GlobalButton 
                                children={isLoading ? <Bounce color="#f4f4f4" /> : "Salvar"} 
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

export default Modal