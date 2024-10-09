import { 
    SecondTitle,
    IconGroup,
    Icon,
    InputSearch,
    DivInput,
    Label,
    Input
} from "../style"
import { BiEdit } from "react-icons/bi"
import { BsCalendar4, BsDownload } from "react-icons/bs"
import { theme } from "../../../theme/theme"
import Top from "../../../components/Top"
import { useState } from "react"
import Modal from "../../../components/Modal"

const SecondHeader = (props) => {

    const { primaryColor, neutralColor } = theme
    const { 
        text, 
        setText,
        filtrarPorData,
        setFiltrarPorData
    } = props.states

    const [abrirModal, setAbrirModal] = useState(false)
    const [dataSelecionada, setDataSelecionada] = useState("")

    function setData(e, value) {
        e.preventDefault()

        setFiltrarPorData({ ...filtrarPorData, lista: value })
        setAbrirModal(false)
    }

    return <>
        <SecondTitle>
            <Top children="Reservas Fechadas" font={19} />
            <IconGroup>
                <InputSearch 
                    inputcolor={primaryColor} 
                    type="text" 
                    placeholder="Procurar" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Icon><BiEdit size={17} color="#545454" /></Icon>
                <Icon onClick={() => setAbrirModal(true)}><BsCalendar4 size={14} color="#545454" /></Icon>
                <Icon><BsDownload size={14} color="#545454" /></Icon>
            </IconGroup>
        </SecondTitle>

        <Modal
            isOpen={abrirModal}
            setOpen={setAbrirModal}
            title="Filtrar por Data"
            funcao={e => setData(e, dataSelecionada)}
        >
            <DivInput>
                <Label textcolor={neutralColor}>Data de Início</Label>
                <Input 
                    type="date"
                    bordercolor={primaryColor}
                    value={dataSelecionada}
                    onChange={e => setDataSelecionada(e.target.value)}
                />
            </DivInput>
        </Modal>
    </>
}

export default SecondHeader