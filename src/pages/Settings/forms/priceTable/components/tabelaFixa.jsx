import { Spinner } from "react-activity"
import { 
    Add, 
    Body, 
    ButtonDelete, 
    ColumnTable, 
    ElementLoading, 
    Header, 
    Loading, 
    RowTable, 
    Square, 
    Table 
} from "../style"
import { unformatCurrency } from "../../../../../utils/UnformatCurrency"
import { formatCurrency } from "../../../../../utils/FormatCurrency"
import { TiDeleteOutline } from "react-icons/ti"
import { theme } from "../../../../../theme/theme"
import { useUser } from "../../../../../context/globalContext"

const TabelaFixa = (props) => {
        
    const { dataClient } = useUser()
    const { setLinhas, linhas, isLoadingTabelaFixa, setDeletedLines } = props.states
    const { neutralColor } = theme
  
    const handleChange = (e, index) => {
        const rawValue = e.target.value
        const numericValue = unformatCurrency(rawValue) / 100
        
        setLinhas(linhas.map((item, i) => (
            i === index ? { ...item, valueNumber: formatCurrency(numericValue, 'BRL') } : item
        )))
    }

    // Função para formatar a entrada como hora (HH:MM)
    const formatTime = (value) => {
        const rawValue = value.replace(/\D/g, "") // Remover tudo que não for número

        if (rawValue.length <= 2) {
            return rawValue // Exibir os primeiros dois dígitos como hora, sem formatação
        }

        let hour = rawValue.slice(0, 2) // Pegar os dois primeiros dígitos como hora
        let minute = rawValue.slice(2, 4) // Pegar os dois últimos como minutos

        // Limitar a hora a um máximo de 23
        if (hour > 23) hour = "23"

        // Limitar os minutos a um máximo de 59
        if (minute > 59) minute = "59"

        return `${hour}:${minute}`
    }

    const handleChangeTime = (e, index) => {
        const inputValue = e.target.value
        const formattedValue = formatTime(inputValue)
        
        setLinhas(linhas.map((item, i) => (
            i === index ? { ...item, valueTime: formattedValue } : item
        )))
    }

    const handleChangeTimeTwo = (e, index) => {
        const inputValue = e.target.value
        const formattedValue = formatTime(inputValue)
        
        setLinhas(linhas.map((item, i) => (
            i === index ? { ...item, valueTimeTwo: formattedValue } : item
        )))
    }

    const buttonDelete = (e, index) => {
        e.preventDefault()

        if (linhas[index]?.id) {
            setDeletedLines(prev => [...prev, { id: linhas[index].id }])
        }   
        setLinhas(prevLinhas => prevLinhas.filter((_, i) => i !== index))
    }

    const renderItem = () => {
        if (isLoadingTabelaFixa) {
            return (
                <ElementLoading>
                    <Spinner size={16} speed={1} /> 
                    <Loading>Carregando...</Loading>
                </ElementLoading>
            )
        }

        return linhas.map((item, index) => (
            <RowTable key={index}>
                <Square
                    type="text"
                    value={item.valueTime}
                    onChange={e => handleChangeTime(e, index)}
                    maxLength={5} 
                    placeholder="00:00h"
                />
                <Square
                    type="text"
                    value={item.valueTimeTwo}
                    onChange={e => handleChangeTimeTwo(e, index)}
                    maxLength={5} 
                    placeholder="00:00h"
                />
                <Square
                    type="text"
                    value={item.valueNumber}
                    onChange={e => handleChange(e, index)}
                    placeholder="R$"
                />
                <ButtonDelete onClick={e => buttonDelete(e, index)}>
                    <TiDeleteOutline size={22} color={neutralColor} />
                </ButtonDelete>
            </RowTable>
        ))
    }

    const addLine = async (e) => {
        e.preventDefault()
        setLinhas([...linhas, { 
            id: null, 
            idEstacionamento: dataClient.id_establishment,
            valueNumber: "", 
            valueTime: "", 
            valueTimeTwo: ""
        }])
    }

    return <>
        <Table>
            <Header>
                <p>De</p>
                <p>Até</p>
                <p>Valor</p>
            </Header>
            <Body>
                <ColumnTable>
                    {renderItem()}
                </ColumnTable>
                <Add onClick={addLine}>+</Add>
            </Body>
        </Table>
    </>
}

export default TabelaFixa