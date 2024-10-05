import Top from "../../../../components/Top"
import {
    Financial,
    Button,
    BlockQuote,
    Section
} from "../../style"
import { useUser } from "../../../../context/globalContext"

const GridOne = (props) => {

    const { buttons, blockquote, colors, states } = props
    const { neutralColor, primaryColor } = colors
    const { selected, setSelected, bqSelected, setBqSelected } = states

    const { dataClient } = useUser()
    const { type_colaborator } = dataClient

    return (
        <>
            <Top children="Gestão" font={19} gridcolumn={1} gridrow={1}/>
            <Financial gridcolumn={1} gridrow={"span 2"}>
                {buttons.map(item => (
                    <div key={item.id} style={{ width: "100%" }}>
                        <Button 
                            textcolor={selected === item.id ? neutralColor : "#7d7d7d"}
                            borderbottom={selected === item.id ? primaryColor : "transparent"}
                            bold={selected === item.id && true}
                            paddingright={".8rem"}
                            onClick={() => setSelected(item.id)}
                            style={ 
                                (item.id === 0 || item.id === 1 || item.id === 2) && type_colaborator === "Funcionário(a)" ?
                                { display: "none" } :
                                {}
                            }
                        >
                            {item.name}
                        </Button>
                        <hr/>

                        { item.id === 0 && 
                            <Section display={selected === 0 ? "inline" : "none"}>
                                {blockquote.map(item => (
                                    <BlockQuote 
                                        textcolor={bqSelected === item.id ? "#858585" : "#b7b7b7"}
                                        bold={bqSelected === item.id ? 700 : 400}
                                        key={item.id}
                                        onClick={() => setBqSelected(item.id)}
                                        style={type_colaborator === "Funcionário(a)" ? { display: "none" } : {}}
                                    >
                                        <p>{item.name}</p>
                                    </BlockQuote>
                                ))}
                            </Section>
                        }
                    </div>
                ))}
            </Financial>
        </>
    )
}

export default GridOne