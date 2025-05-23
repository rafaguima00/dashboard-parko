import logo from "../../../assets/logo-parko.png"
import { WelcomeArea, Logo, Slogan, ElementText } from "../style"

const Welcome = () => {
    return (
        <WelcomeArea>
            <Logo src={logo} />
            <ElementText>
                <Slogan>
                    O melhor lugar para <strong>gerenciar seu estacionamento!</strong>
                </Slogan>
            </ElementText>
        </WelcomeArea>
    )
}

export default Welcome