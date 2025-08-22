import { HoraFracao, InputArea, InputNumber, Label, Row } from "../style"
import { theme } from "../../../../../theme/theme"
import { unformatCurrency } from "../../../../../utils/UnformatCurrency"
import { formatCurrency } from "../../../../../utils/FormatCurrency"

const FracaoHora = (props) => {

    const { primaryColor } = theme
    const { formTable, setFormTable } = props.states

    const handleValorHora = (e, variavel) => {
        const rawValue = e.target.value
        let numericString = unformatCurrency(rawValue)

        // Limitar a quantidade para no máximo 4 dígitos
        if (numericString.length > 4) {
            numericString = numericString.slice(0, 4)
            return
        }

        const numericValue = unformatCurrency(rawValue) / 100
        setFormTable({ ...formTable, [variavel]: formatCurrency(numericValue, 'BRL') })
    }

    return <>
        <HoraFracao>
            <Row>
                <Label>Qual o valor da fração da hora em seu estabelecimento?</Label>
                <InputArea> 
                    <InputNumber 
                        bordercolor={primaryColor} 
                        type="text" 
                        placeholder="R$ 0,00"
                        value={formTable.valor_fracao_hora}
                        onChange={e => handleValorHora(e, "valor_fracao_hora")}
                    />
                </InputArea>
            </Row>
            <Row>
                <Label>Qual o valor da hora em seu estabelecimento?</Label>
                <InputArea>
                    <InputNumber 
                        bordercolor={primaryColor} 
                        type="text" 
                        placeholder="R$ 0,00"
                        value={formTable.valor_hora}
                        onChange={e => handleValorHora(e, "valor_hora")}
                    />
                </InputArea>
            </Row>
        </HoraFracao>
    </>
}

export default FracaoHora