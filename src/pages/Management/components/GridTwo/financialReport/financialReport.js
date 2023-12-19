import { 
    Div, 
    Span, 
    Icon,
    Footer,
    Button
} from "../../../style";
import { GoArrowSwitch } from "react-icons/go";
import { FiDownload } from "react-icons/fi";
import Cash from "./subComponents/cash";
import Client from "./subComponents/client";
import Costs from "./subComponents/costs";
import General from "./subComponents/general";
import HeritageAndStock from "./subComponents/heritageAndStock";
import { theme } from "../../../../../theme/theme";
import ReportCash from "./bottom/report/cash";
import { useState } from "react";
import GraphicFlow from "./bottom/graphics";


const FinancialReport = (props) => {

    const { bqSelected } = props;
    const { neutralColor, cancelColor, primaryColor } = theme;

    const [graphic, setGraphic] = useState(false);

    return (
        <Span>
            <Div height={50}>
                {bqSelected === 0 && <Cash neutralColor={neutralColor} />}
                {bqSelected === 1 && <Client/>}
                {bqSelected === 2 && <Costs/>}
                {bqSelected === 3 && <HeritageAndStock/>}
                {bqSelected === 4 && <General/>}
            </Div>
            <Div height={50}>
                <Icon onClick={() => setGraphic(!graphic)}>
                    <GoArrowSwitch size={17} />
                </Icon>
                <Footer>

                    {graphic ? 
                        <> 
                            {bqSelected === 0 && <GraphicFlow/>}
                            {bqSelected === 1 && <p>cliente</p>}
                            {bqSelected === 2 && <p>custos</p>}
                            {bqSelected === 3 && <p>patrimonio</p>}
                            {bqSelected === 4 && <p>geral</p>}
                        </> : 
                        <>
                            {bqSelected === 0 && <ReportCash colors={{ primaryColor, cancelColor }} />}
                            {bqSelected === 1 && <p>cliente</p>}
                            {bqSelected === 2 && <p>custos</p>}
                            {bqSelected === 3 && <p>patrimonio</p>}
                            {bqSelected === 4 && <p>geral</p>}
                        </>
                    }

                    <Button font={16} textcolor="#c7c7c7">
                        <p>Clique aqui para baixar</p>
                        <FiDownload color="#c7c7c7" size={21} />
                    </Button>
                </Footer>
            </Div>
        </Span>
    )
}

export default FinancialReport;