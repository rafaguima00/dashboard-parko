import { ButtonGroup } from "../style"
import GlobalButton from "../../../components/Button"
import { theme } from "../../../theme/theme"
import { useUser } from "../../../context/globalContext"
import Modal from "../../../components/Modal"
import { useEffect, useState } from "react"
import api from "../../../services/api/server"
import StartEndTill from "./startEndTill"
import { unformatCurrency } from "../../../utils/UnformatCurrency"
import Contribution from "../form/contribution"
import Retirada from "../form/retirada"
import { createdAt } from "../../../utils/ConverterDataParaFormatoPadrao"
import useAportes from "../../../hooks/useAportes"
import useRetiradas from "../../../hooks/useRetiradas"

const Buttons = () => {

    const { cancelColor, primaryColor } = theme

    const { dataClient, caixaAberto, valorDoCaixa, setCaixaAberto } = useUser()
    const { addAportes } = useAportes()
    const { addRetiradas } = useRetiradas()

    const [modalAporte, setModalAporte] = useState(false)
    const [modalRetirada, setModalRetirada] = useState(false)
    const [loading, setLoading] = useState(false)
    const [messageError, setMessageError] = useState("")

    const [novoAporte, setNovoAporte] = useState({
        created_at: "",
        value: "",
        description: ""
    })

    const [novaRetirada, setNovaRetirada] = useState({
        created_at: "",
        value: "",
        description: ""
    })

    const [modalFecharCaixa, setModalFecharCaixa] = useState({
        open: false,
        loading: false
    })

    const [valorEmEspecie, setValorEmEspecie] = useState("")

    async function fecharCaixa(e) {
        e.preventDefault()

        setModalFecharCaixa({ ...modalFecharCaixa, loading: true })

        if (caixaAberto?.aberto === 0) {
            alert("O caixa já está fechado")
            setModalFecharCaixa({ ...modalFecharCaixa, loading: false })
            setModalFecharCaixa({ ...modalFecharCaixa, open: false })
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

        setModalFecharCaixa({ open: false, loading: false })
    }

    const criarAporte = async (e, setOpen) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            await addAportes({
                id_establishment: dataClient.id_establishment,
                id_colaborator: dataClient.id,
                created_at: createdAt(novoAporte.created_at),
                value: unformatCurrency(novoAporte.value) / 100,
                description: novoAporte.description
            })

            alert("Concluído")
            setOpen(false)
            setNovoAporte({})
        } catch (error) {
            setMessageError(error)
        } finally {
            setLoading(false)
        }
    }

    const criarRetirada = async (e, setOpen) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            await addRetiradas({
                id_establishment: dataClient.id_establishment,
                id_colaborator: dataClient.id,
                created_at: createdAt(novaRetirada.created_at),
                value: unformatCurrency(novaRetirada.value) / 100,
                description: novaRetirada.description
            })

            alert("Concluído")
            setOpen(false)
            setNovaRetirada({})
        } catch (error) {
            setMessageError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (modalFecharCaixa.open === false) {
            setValorEmEspecie("")
        }
    }, [modalFecharCaixa])

    return <>
            <ButtonGroup>
                <GlobalButton 
                    children="Fechar Caixa"
                    background={cancelColor}
                    largura={"7rem"}
                    aoPressionar={() => setModalFecharCaixa({ ...modalFecharCaixa, open: true })}
                />
                <GlobalButton 
                    children="Aporte"
                    background={primaryColor}
                    largura={"7rem"}
                    aoPressionar={() => setModalAporte(true)}
                    disabled={dataClient.type_colaborator === "Funcionário(a)" ? true : false}
                />
                <GlobalButton 
                    children="Retirada"
                    background={primaryColor}
                    largura={"7rem"}
                    aoPressionar={() => setModalRetirada(true)}
                    disabled={dataClient.type_colaborator === "Funcionário(a)" ? true : false}
                />
            </ButtonGroup>

            <Modal
                isOpen={modalFecharCaixa.open}
                setOpen={() => setModalFecharCaixa({ ...modalFecharCaixa, open: !modalFecharCaixa.open })}
                isLoading={modalFecharCaixa.loading}
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

            <Modal
                isOpen={modalAporte}
                setOpen={setModalAporte}
                title={"Aporte de Dinheiro"}
                maxWidth={"30rem"}
                funcao={e => criarAporte(e, setModalAporte)}
                isLoading={loading}
            >
                <Contribution 
                    state={{ setNovoAporte, novoAporte }}
                    messageError={messageError}
                />
            </Modal>

            <Modal
                isOpen={modalRetirada}
                setOpen={setModalRetirada}
                title={"Retirada de Dinheiro"}
                maxWidth={"30rem"}
                funcao={e => criarRetirada(e, setModalRetirada)}
                isLoading={loading}
            >
                <Retirada 
                    state={{ setNovaRetirada, novaRetirada }}
                    messageError={messageError}
                />
            </Modal>
        </>
    
}

export default Buttons