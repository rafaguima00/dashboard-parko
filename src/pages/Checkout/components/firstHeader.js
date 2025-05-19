import { BsCalendar4, BsPrinter, BsDownload } from "react-icons/bs"
import {
    Title,
    IconGroup,
    Icon,
    DivInput,
    Label,
    Input
} from "../style"
import Top from "../../../components/Top"
import Modal from "../../../components/Modal"
import { useState } from "react"
import { theme } from "../../../theme/theme"

const FirstHeader = (props) => {

    const { setFiltrarPorData, filtrarPorData } = props.states
    const { neutralColor, primaryColor } = theme

    const [abrirModal, setAbrirModal] = useState(false)
    const [dataSelecionada, setDataSelecionada] = useState("")

    function setData(e, value) {
        e.preventDefault()

        const arrayFormatoPadrao = value.split("-")
        const formatoPadrao = `${arrayFormatoPadrao[2]}/${arrayFormatoPadrao[1]}/${arrayFormatoPadrao[0]}`

        setFiltrarPorData({ ...filtrarPorData, resumo: formatoPadrao })
        setAbrirModal(false)
    }
    
    return <>
        <Title>
            <Top children="Caixa Aberto" font={19} />
            <IconGroup>
                <Icon><BsPrinter size={14} color="#545454"/></Icon>
                <Icon><BsDownload size={14} color="#545454"/></Icon>
                <Icon onClick={() => setAbrirModal(true)}><BsCalendar4 size={14} color="#545454"/></Icon>
            </IconGroup>
        </Title>

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

export default FirstHeader