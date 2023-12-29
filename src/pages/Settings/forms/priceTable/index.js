import { ContainerForm, DivButton } from "../style";
import TopForm from "../../components/topForm";
import { 
    Form, 
    Label,
    Row,
    InputArea,
    Select,
    InputText,
    Column,
    Block
} from "./style";
import { theme } from "../../../../theme/theme";
import GlobalButton from "../../../../components/button/button";
import { useNavigate } from "react-router-dom";

const PriceTableForm = () => {

    const { primaryColor, cancelColor, greenColor } = theme;

    const navigate = useNavigate();

    const screenBack = () => {
        return navigate("/settings")
    }

    return (
        <ContainerForm>
            <TopForm children="Tabela de Preços" />
            <Block>
                <Form>
                    <Row>
                        <Label>Há tempo de tolerância em seu estabelecimento?</Label>
                        <InputArea>
                            <div>
                                <input type="radio" name="tolerance"/>
                                <Label font={14} textcolor={"#7d7d7d"}>Sim</Label>
                            </div>
                            <div>
                                <input type="radio" name="tolerance" checked/>
                                <Label font={14} textcolor={"#7d7d7d"}>Não</Label>
                            </div>
                        </InputArea>
                    </Row>
                    <Row>
                        <Label>Qual o tempo de tolerância do seu estabelecimento?</Label>
                        <InputArea>
                            <Select bordercolor={primaryColor}>
                                <option>00:10</option>
                                <option>00:15</option>
                                <option>00:20</option>
                                <option>00:30</option>
                            </Select>
                        </InputArea>
                    </Row>
                    <Column>
                        <Label bold>Selecione o tipo de cobrança:</Label>
                        <InputArea>
                            <div>
                                <input type="radio" name="charge"/>
                                <Label font={14} textcolor={"#7d7d7d"}>Hora e fração da hora</Label>
                            </div>
                            <div>
                                <input type="radio" name="charge" checked/>
                                <Label font={14} textcolor={"#7d7d7d"}>Tabela fixa</Label>
                            </div>
                        </InputArea>
                    </Column>
                    <Row>
                        <Label>Qual o valor da fração da hora em seu estabelecimento?</Label>
                        <InputArea> 
                            <InputText bordercolor={primaryColor} type="number" placeholder="R$ 0,00"/>
                        </InputArea>
                    </Row>
                    <Row>
                        <Label>Qual o valor da hora em seu estabelecimento?</Label>
                        <InputArea>
                            <InputText bordercolor={primaryColor} type="number" placeholder="R$ 0,00"/>
                        </InputArea>
                    </Row>
                    <DivButton marg={"3rem"}>
                        <GlobalButton 
                            children="Cancelar"
                            background={cancelColor}
                            largura={"12rem"}
                            altura={"2.8rem"}
                            aoPressionar={screenBack}
                        />
                        <GlobalButton 
                            children="Salvar"
                            background={greenColor}
                            largura={"12rem"}
                            altura={"2.8rem"}
                        />
                    </DivButton>
                </Form>
            </Block>
        </ContainerForm>
    )
}

export default PriceTableForm;