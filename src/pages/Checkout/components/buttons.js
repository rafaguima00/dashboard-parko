import {
    ButtonGroup,
    Button
} from "../style";

const Buttons = () => {
    return (
        <ButtonGroup>
            <Button buttonColor={"#d64d4d"}>Fechar caixa</Button>
            <Button>Aporte</Button>
            <Button>Retirada</Button>
        </ButtonGroup>
    )
}

export default Buttons;