import phone from "../../../../../../assets/Phone.png"
import ticket from "../../../../../../assets/Ticket.png"
import wallet from "../../../../../../assets/Wallet.png"
import { GoArrowRight } from "react-icons/go"
import { Section,  FormButton,  FormItem,  TextItem, DivImage, Icon } from "../style"
import { useUser } from "../../../../../../context/globalContext"

const FormList = (props) => {

    const { primaryColor } = props
    const { setOccurrenceItem, setFormActive } = useUser()

    const openForm = (num) => {
        setOccurrenceItem({})
        setFormActive(num)
    }

    return (
        <Section>
            <FormButton background={primaryColor}>
                <FormItem>
                    <DivImage>
                        <img src={ticket} alt="Perda de Ticket"/>
                    </DivImage>
                    <TextItem textcolor="#f4f4f4">Perda de Ticket</TextItem>
                </FormItem>
                <Icon onClick={() => openForm(1)}>
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
                <Icon onClick={() => openForm(2)}>
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
                <Icon onClick={() => openForm(3)}>
                    <GoArrowRight size={22} color={primaryColor}/>
                </Icon>
            </FormButton>
        </Section>
    )
}

export default FormList