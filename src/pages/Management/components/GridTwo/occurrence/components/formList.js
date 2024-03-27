import phone from "../../../../../../assets/Phone.png";
import ticket from "../../../../../../assets/Ticket.png";
import wallet from "../../../../../../assets/Wallet.png";
import { GoArrowRight } from "react-icons/go";
import {
    Section, 
    FormButton, 
    FormItem, 
    TextItem,
    DivImage,
    Icon
} from "../style";

const FormList = (props) => {

    const { primaryColor } = props;
    const { setFormActive, setOccurrenceItem } = props.state;

    const openFormTicket = () => {
        setOccurrenceItem({});
        setFormActive(1);
    };

    const openFormCliente = () => {
        setOccurrenceItem({});
        setFormActive(2);
    };

    const openFormPatrimonio = () => {
        setOccurrenceItem({});
        setFormActive(3);
    };

    return (
        <Section>
            <FormButton background={primaryColor}>
                <FormItem>
                    <DivImage>
                        <img src={ticket} alt="Perda de Ticket"/>
                    </DivImage>
                    <TextItem textcolor="#f4f4f4">Perda de Ticket</TextItem>
                </FormItem>
                <Icon onClick={openFormTicket}>
                    <GoArrowRight size={22} color={primaryColor}/>
                </Icon>
            </FormButton>
            <FormButton background={primaryColor}>
                <FormItem>
                    <DivImage>
                        <img src={phone} alt="Furto de bens do cliente"/>
                    </DivImage>
                    <TextItem textcolor="#f4f4f4">Furto de bens do cliente</TextItem>
                </FormItem>
                <Icon onClick={openFormCliente}>
                    <GoArrowRight size={22} color={primaryColor}/>
                </Icon>
            </FormButton>
            <FormButton background={primaryColor}>
                <FormItem>
                    <DivImage>
                        <img src={wallet} alt="Furto de itens do patrimônio"/>
                    </DivImage>
                    <TextItem textcolor="#f4f4f4">Furto de itens do patrimônio</TextItem>
                </FormItem>
                <Icon onClick={openFormPatrimonio}>
                    <GoArrowRight size={22} color={primaryColor}/>
                </Icon>
            </FormButton>
        </Section>
    )
}

export default FormList;