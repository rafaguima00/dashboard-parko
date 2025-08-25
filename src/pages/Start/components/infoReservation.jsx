import { useState, useEffect } from "react"
import { useUser } from "../../../context/globalContext"
import { useNavigate } from "react-router-dom"
import { InfoReservation, GroupButton, Line, ElementLoading } from "../style"
import GlobalButton from "../../../components/Button"
import { theme } from "../../../theme/theme"
import { Chart as ChartJS, ArcElement, Title } from "chart.js"
import Modal from "../../../components/Modal"
import NewReservation from "../form/newReservation"
import api from "../../../services/api/server"
import Informacoes from "./informacoes"
import useReservation from "../../../hooks/useReservation"
import { FaPlus } from "react-icons/fa6"

ChartJS.register(ArcElement, Title)

const InfoReserve = () => {

    const heightButton = "2.4rem"
    const { primaryColor, cancelColor, neutralColor } = theme
    const { valorDoCaixa } = useUser()
    const navigate = useNavigate()
    const { addReservation } = useReservation()

    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    const [carregando, setCarregando] = useState(false)
    const [modalAbrirCx, setModalAbrirCx] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalFecharCx, setModalFecharCx] = useState(false)
    const [valueReservation, setValueReservation] = useState(0)

    const { 
        dataClient, reservations, 
        priceTable, setPriceTable,
        setCaixaAberto, caixaAberto,
        setTabelaFixa, tabelaFixa,
        park
    } = useUser()

    const getPriceTable = async () => {
        await api.get(`/tabela_preco/${dataClient.id_establishment}`)
            .then(res => {
                setPriceTable(res.data[0])
            }) 
            .catch(e => {
                console.log(e)
            })
    }

    const getTabelaFixa = async () => {
        await api.get(`/tabela_fixa/${dataClient.id_establishment}`)
        .then(res => {
            setTabelaFixa(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    // Verificar se já existe cadastro do usuário
    const verificarUsuario = async () => {
        setCarregando(true)

        await api.get("/users")
            .then(res => {
                const verify = res.data.filter(item => item.name.toLowerCase() === data.name_user.toLowerCase() && item.tel === data.tel)

                if (verify.length > 0) {
                    verificarVeiculo(verify[0].id)
                } else {
                    createUser()
                }
            })
            .catch(e => {
                console.log(e)
                setCarregando(false)
            })
    }

    // Verificar se placa do veículo já existe no banco
    const verificarVeiculo = async (idUser) => {
        await api.get("/vehicles")
            .then(res => {
                const verify = res.data.filter(item => item.license_plate === data.license_plate)
                
                if (verify.length > 0) {
                    createReservation(verify[0].id, idUser)
                } else {
                    createVehicle(idUser)
                }
            })
            .catch(e => {
                console.log(e)
                setCarregando(false)
            })
    }

    // 1- Pegar as informações do usuário e criar no banco de dados
    const createUser = async () => {
        setCarregando(true)

        await api.post("/users", { 
            tel: data.tel,
            name_user: data.name_user, 
            email: "", 
            cpf: "", 
            rg: "", 
            data_nasc: "",
            password: ""
        })
            .then(res => {
                verificarVeiculo(res.data.id)
            })
            .catch(e => {
                console.log(e)
                setCarregando(false)
            })
    }

    // 2- Pegar as informações do veículo e criar no banco de dados
    const createVehicle = async (idUser) => {

        await api.post("/vehicles", {
            id_costumer: idUser, 
            name_vehicle: data.name_vehicle, 
            color: data.color,
            license_plate: data.license_plate
        })
            .then(res => {
                createReservation(res.data.id, idUser)
            })
            .catch(e => {
                console.log(e)
                setCarregando(false)
            })
    }

    // 3- Feito isso, cadastrar a reserva no banco de dados
    const createReservation = async (idVehicle, idUser) => {
        try {
            await addReservation({
                data_entrada: data.data_entrada,
                hora_entrada: data.hora_entrada,
                data_saida: "", 
                hora_saida: "",
                value: valueReservation, 
                id_costumer: idUser,
                id_vehicle: idVehicle, 
                id_establishment: dataClient.id_establishment,
                parko_app: 0,
                status_reservation: 2
            })
            setOpen(false)
            alert("Reserva realizada com sucesso")
            setData({})
        } catch (error) {
            throw error
        } finally {
            setCarregando(false)
            setValueReservation(0)
        }
    }

    // Calcular valor da reserva
    const calcularValorDaReserva = (e) => {
        e.preventDefault()
        setCarregando(true)
        
        if (park.type_of_charge === "hora_fracao") {
            setValueReservation(priceTable?.valor_hora)
        }

        if (park.type_of_charge === "tabela_fixa") {
            setValueReservation(tabelaFixa[0]?.value)
        }
    }

    const verificarSeEstaAberto = async () => {
        await api.get(`/abertura_caixa/parking/${dataClient.id_establishment}`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setCaixaAberto(res.data[res.data.length - 1])
                    return
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const abrirCaixa = async (e) => {
        e.preventDefault()

        setLoading(true)

        if (caixaAberto?.aberto === 1) {
            alert("O caixa já está aberto")
            setModalAbrirCx(false)
            setLoading(false)
            return
        }

        await api.post("/abertura_caixa", { 
            id_establishment: dataClient.id_establishment,
            id_colaborator: dataClient.id
        })
            .then(() => {
                verificarSeEstaAberto()
                alert("Caixa aberto")
                return navigate("/checkout")
            })
            .catch(e => {
                alert("Erro ao abrir caixa")
                setModalAbrirCx(false)
            })

        setLoading(false)
    }

    const fecharCaixa = async (e) => {
        e.preventDefault()

        setLoading(true)

        if (caixaAberto?.aberto === 0) {
            alert("O caixa já está fechado")
            setModalFecharCx(false)
            setLoading(false)
            return
        }

        await api.put(`/abertura_caixa/${caixaAberto?.id}`, { 
            aberto: 0,
            valor_fechamento: valorDoCaixa
        })
            .then(res => {
                setCaixaAberto(res.data[0])
                alert("Caixa fechado")
                setModalFecharCx(false)
            })
            .catch(() => {
                alert("Erro ao fechar caixa")
                setModalFecharCx(false)
            })

        setLoading(false)
    }

    const tituloNovaReserva = () => {
        return (
            <>
                <ElementLoading gap={4}>
                    <FaPlus size={14} />
                    <p>Nova Reserva</p>
                </ElementLoading>
            </>
        )
    }

    useEffect(() => {
        if (dataClient.id_establishment) {
            verificarSeEstaAberto()
            getPriceTable()
            getTabelaFixa()
        }
    }, [dataClient.id_establishment])

    useEffect(() => {
        if (valueReservation > 0) {
            verificarUsuario()
        }
    }, [valueReservation])
    
    return (
        <InfoReservation>
            <Informacoes />
            
            <GroupButton>
                <GlobalButton
                    background={primaryColor}
                    children={tituloNovaReserva()}
                    altura={heightButton}
                    aoPressionar={() => setOpen(true)}
                />
                <GlobalButton
                    background={primaryColor}
                    children="Abrir Caixa"
                    altura={heightButton}
                    aoPressionar={() => setModalAbrirCx(true)}
                />
                <GlobalButton
                    background={cancelColor}
                    children="Fechar Caixa"
                    altura={heightButton}
                    aoPressionar={() => setModalFecharCx(true)}
                />
            </GroupButton>

            <Modal 
                isOpen={open} 
                setOpen={setOpen} 
                title={"Nova Reserva"}
                maxWidth={"52rem"}
                funcao={calcularValorDaReserva}
                isLoading={carregando}
            >
                <NewReservation 
                    state={{
                        data, 
                        setData,
                        reservations
                    }}
                />
            </Modal>

            <Modal
                isOpen={modalAbrirCx}
                setOpen={setModalAbrirCx}
                title={"Abrir Caixa"}
                maxWidth={"52rem"}
                funcao={abrirCaixa}
                isLoading={loading}
            >
                <Line textcolor={neutralColor}>Deseja abrir caixa agora?</Line>
            </Modal>

            <Modal
                isOpen={modalFecharCx}
                setOpen={setModalFecharCx}
                title={"Fechar Caixa"}
                maxWidth={"52rem"}
                funcao={fecharCaixa}
                isLoading={loading}
            >
                <Line textcolor={neutralColor}>Deseja fechar caixa agora?</Line>
            </Modal>
        </InfoReservation>
    )
}

export default InfoReserve