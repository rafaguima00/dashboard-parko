import { 
    Container, 
    Title, 
    Financial, 
    Button,
    BlockQuote,
    Section
} from "./style";
import { theme } from "../../theme/theme";
import { useState } from "react";
import FinancialReport from "./components/financialReport";
import Accounts from "./components/accounts";
import Heritage from "./components/heritage";
import Occurrence from "./components/occurrence";
import { buttons } from "./buttons/buttons";
import { blockquote } from "./buttons/blockquote";

const Management = () => {

    const { neutralColor, primaryColor } = theme;

    const [selected, setSelected] = useState(0);
    const [bqSelected, setBqSelected] = useState(0);

    return (
        <Container>
            <Title gridColumn={1} gridRow={1}>
                <strong>Gestão</strong>
            </Title>
            <Financial gridColumn={1} gridRow={"span 2"}>
                {buttons.map(item => (
                    <div key={item.id} style={{ width: "100%" }}>
                        <Button 
                            textcolor={selected === item.id ? neutralColor : "#7d7d7d"}
                            borderbottom={selected === item.id ? primaryColor : "transparent"}
                            onClick={() => setSelected(item.id)}
                        >
                            {item.name}
                        </Button>
                        <hr/>

                        { item.id === 0 && 
                            <Section>
                                {blockquote.map(item => (
                                    <BlockQuote 
                                        textcolor={bqSelected === item.id ? "#858585" : "#b7b7b7"}
                                        key={item.id}
                                        onClick={() => setBqSelected(item.id)}
                                    >
                                        {item.name}
                                    </BlockQuote>
                                ))}
                            </Section>
                        }
                    </div>
                ))}
            </Financial>
            <Title gridColumn={"span 2"} gridRow={1}>
                <strong>Relatórios</strong> Financeiros
            </Title>
            <Financial gridColumn={"span 2"} gridRow={"span 2"}>
                { selected === 0 && <FinancialReport bqSelected={bqSelected} /> }
                { selected === 1 && <Accounts/> }
                { selected === 2 && <Heritage/> }
                { selected === 3 && <Occurrence/> }
            </Financial>
        </Container>
    )
}

export default Management;