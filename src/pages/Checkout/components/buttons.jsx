import { ButtonGroup } from "../style"
import GlobalButton from "../../../components/Button"
import { theme } from "../../../theme/theme"
import { useUser } from "../../../context/globalContext"
import Modal from "../../../components/Modal"
import { useEffect, useState } from "react"
import api from "../../../services/api/server"
import StartEndTill from "./startEndTill"
import { unformatCurrency } from "../../../utils/UnformatCurrency"

const Buttons = ({ setOpen, setOpenRetirada }) => {

    const { cancelColor, primaryColor } = theme
    const { dataClient, caixaAberto, valorDoCaixa, setCaixaAberto } = useUser()
    
    const [modal, setModal] = useState({
        open: false,
        loading: false
    })
    const [valorEmEspecie, setValorEmEspecie] = useState("")

    async function fecharCaixa(e) {
        e.preventDefault()

        setModal({ ...modal, loading: true })

        if (caixaAberto?.aberto === 0) {
            alert("O caixa já está fechado")
            setModal({ ...modal, loading: false })
            setModal({ ...modal, open: false })
            return
        }

        await api.put(`/abertura_caixa/${caixaAberto?.id}`, { 
            aberto: 0,
            valor_fechamento: unformatCurrency(valorEmEspecie) / 100 || valorDoCaixa
        })
            .then(res => {
                setCaixaAberto(res.data[0])
                alert("Caixa fechado")
            })
            .catch(e => {
                alert("Erro ao fechar caixa")
                console.log(e)
            })

        setModal({ open: false, loading: false })
    }

    useEffect(() => {
        if (modal.open === false) {
            setValorEmEspecie("")
        }
    }, [modal])

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
                <StartEndTill 
                    children={"Deseja fechar caixa agora?"}
                    label={"Insira o valor em espécie do caixa"}
                    value={valorEmEspecie}
                    setValue={setValorEmEspecie}
                />
            </Modal>
        </>
    
}

export default Buttons