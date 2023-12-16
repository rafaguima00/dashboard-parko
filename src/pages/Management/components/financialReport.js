import { 
    Div, 
    Span, 
    Icon,
    Footer
} from "../style";
import { GoArrowSwitch } from "react-icons/go";
import { FiDownload } from "react-icons/fi";
import Cash from "./fnReport/cash";
import Client from "./fnReport/client";
import Costs from "./fnReport/costs";
import General from "./fnReport/general";
import HeritageAndStock from "./fnReport/heritageAndStock";


const FinancialReport = (props) => {

    const { bqSelected } = props;

    return (
        <Span>
            <Div height={50}>
                {bqSelected === 0 && <Cash/>}
                {bqSelected === 1 && <Client/>}
                {bqSelected === 2 && <Costs/>}
                {bqSelected === 3 && <HeritageAndStock/>}
                {bqSelected === 4 && <General/>}
            </Div>
            <Div height={50}>
                <Icon>
                    <GoArrowSwitch size={17} />
                </Icon>
                <Footer>
                    <p>Clique aqui para baixar</p>
                    <FiDownload color="#c7c7c7" size={21} />
                </Footer>
            </Div>
        </Span>
    )
}

export default FinancialReport;