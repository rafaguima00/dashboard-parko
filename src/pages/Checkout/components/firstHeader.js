import { BsCalendar4, BsPrinter, BsDownload } from "react-icons/bs";
import {
    Title,
    IconGroup,
    Icon
} from "../style";

const FirstHeader = () => {
    return (
        <Title>
            <p><strong>Caixa</strong> Aberto</p>
            <IconGroup>
                <Icon><BsPrinter size={16} color="#545454" /></Icon>
                <Icon><BsDownload size={16} color="#545454" /></Icon>
                <Icon><BsCalendar4 size={16} color="#545454" /></Icon>
            </IconGroup>
        </Title>
    )
}

export default FirstHeader;