import { ButtonGroup, Line } from "../style"
import GlobalButton from "../../../components/Button"
import { theme } from "../../../theme/theme"
import { useUser } from "../../../context/globalContext"
import Modal from "../../../components/Modal"
import { useState } from "react"
import api from "../../../services/api/server"

const Buttons = ({ setOpen, setOpenRetirada }) => {

    const { cancelColor, primaryColor, neutralColor } = theme
    const { dataClient, caixaAberto, valorDoCaixa, setCaixaAberto } = useUser()
    
    const [modal, setModal] = useState({
        open: false,
        loading: false
    })

    async function fecharCaixa(e) {
        e.preventDefault()

        setModal({ ...modal, loading: true })

        if(caixaAberto?.aberto === 0) {
            alert("O caixa já está fechado")
            setModal({ ...modal, loading: false })
            setModal({ ...modal, open: false })
            return
        }

        await api.put(`/abertura_caixa/${caixaAberto?.id}`, { 
            aberto: 0,
            valor_fechamento: valorDoCaixa
        })
        .then(res => {
            setCaixaAberto(res.data[0])
            alert("Caixa fechado")
        })
        .catch(e => {
            alert("Erro ao fechar caixa")
        })

        setModal({ ...modal, loading: false })
        setModal({ ...modal, open: false })
    }

    return <>
            <ButtonGroup>
                <GlobalButton 
                    children="Fechar Caixa"
                    background={cancelColor}
                    largura={"7rem"}
                    aoPressionar={() => setModal({ ...modal, open: true })}
                />
                <GlobalButton 
                    children="Aporte"
                    background={primaryColor}
                    largura={"7rem"}
                    aoPressionar={() => setOpen(true)}
                    disabled={dataClient.type_colaborator === "Funcionário(a)" ? true : false}
                />
                <GlobalButton 
                    children="Retirada"
                    background={primaryColor}
                    largura={"7rem"}
                    aoPressionar={() => setOpenRetirada(true)}
                    disabled={dataClient.type_colaborator === "Funcionário(a)" ? true : false}
                />
            </ButtonGroup>

            <Modal
                isOpen={modal.open}
                setOpen={() => setModal({ ...modal, open: !modal.open })}
                isLoading={modal.loading}
                title="Fechar Caixa"
                funcao={fecharCaixa}
            >
                <Line textcolor={neutralColor}>Deseja fechar caixa agora?</Line>
            </Modal>
        </>
    
}

export default Buttons