import { useState, useEffect } from "react"
import { useUser } from "../../../context/globalContext"
import { useNavigate } from "react-router-dom"
import {
    InfoReservation,
    GroupInfo,
    TitleLine,
    Subtitle,
    Info,
    TextAligned,
    GroupButton,
    Line
} from "../style"
import { formatCurrency } from "../../../services/formatCurrency"
import { FaRightLeft } from "react-icons/fa6"
import GlobalButton from "../../../components/Button"
import { theme } from "../../../theme/theme"
import { Chart as ChartJS, ArcElement, Title } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { datachart, options } from "../datasets/doughnut"
import { dataCliente, optionsClient } from "../datasets/dgClientSatisfation"
import Modal from "../../../components/Modal"
import NewReservation from "../form/newReservation"
import api from "../../../services/api/server"

ChartJS.register(ArcElement, Title)

const InfoReserve = () => {

    const heightButton = "2.4rem"
    const styleIcon = {
        position: "absolute",
        right: 0,
        top: 0,
        margin: 10
    }
    const { primaryColor, cancelColor, neutralColor } = theme
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    const [carregando, setCarregando] = useState(false)
    const [modalAbrirCx, setModalAbrirCx] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalFecharCx, setModalFecharCx] = useState(false)

    const { 
        dataClient, 
        park, 
        reservations, 
        priceTable,
        setCaixaAberto,
        caixaAberto
    } = useUser()

    const valorDaHora = priceTable?.valor_hora ?? null

    // Ao clicar em 'Nova reserva' cadastrar o cliente e retornar o id
    const verifyUsers = async () => {
        await api.get("/users")
        .then(res => {
            createVehicle(res.data[res.data.length - 1].id)
        })
        .catch(e => {
            console.log(e)
        })
    }

    // Depois de criar o cliente cadastrar o veículo e retornar o id
    const verifyVehicles = async (idUser) => {
        await api.get("/vehicles")
        .then(res => {
            createReservation(res.data[res.data.length - 1], idUser)
        })
        .catch(e => {
            console.log(e)
        })
    }

    // 1- Pegar as informações do usuário e criar no banco de dados
    const createUser = async (e) => {
        e.preventDefault()

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
        .then(() => {
            verifyUsers()
            setData({})
        })
        .catch(e => {
            console.log(e.response.data.message)
            setCarregando(false)
            setData({})
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
        .then(() => {
            verifyVehicles(idUser)
            setData({})
        })
        .catch(e => {
            console.log(e.response.data.message)
            setCarregando(false)
            setData({})
        })
    }

    // 3- Feito isso, cadastrar a reserva no banco de dados
    const createReservation = async (idVehicle, idUser) => {

        await api.post("/reservations", {
            data_entrada: data.data_entrada,
            hora_entrada: data.hora_entrada,
            data_saida: "", 
            hora_saida: "",
            value: valorDaHora, 
            id_costumer: idUser,
            id_vehicle: idVehicle.id, 
            id_establishment: dataClient.id_establishment,
            parko_app: 0
        })
        .then(() => {
            setCarregando(false)
            setOpen(false)
            alert("Reserva realizada com sucesso")
            setData({})
        })
        .catch(e => {
            console.log(e.response.data.message)
            setCarregando(false)
            setData({})
        })
    }

    const verificarSeEstaAberto = async () => {
        await api.get(`/abertura_caixa/parking/${dataClient.id_establishment}`)
        .then(res => {
            if (res.data && res.data.length > 0) {
                setCaixaAberto(res.data[res.data.length - 1])
                return
            }

            console.log('Nenhum dado encontrado')
        })
        .catch(e => {
            console.log(e)
        })
    }

    const abrirCaixa = async (e) => {
        e.preventDefault()

        setLoading(true)

        if(caixaAberto?.aberto === 1) {
            alert("O caixa já está aberto")
            setModalAbrirCx(false)
            setLoading(false)
            return
        }

        await api.post("/abertura_caixa", { 
            id_establishment: dataClient.id_establishment,
            id_colaborator: dataClient.id,
            value: caixaAberto?.value
        })
        .then(() => {
            alert("Caixa aberto")
            return navigate("/checkout")
        })
        .catch(e => {
            alert("Erro ao abrir caixa")
            setModalAbrirCx(false)
            console.log(e)
        })

        setLoading(false)
    }

    const fecharCaixa = async (e) => {
        e.preventDefault()

        setLoading(true)

        if(caixaAberto?.aberto === 0) {
            alert("O caixa já está fechado")
            setModalFecharCx(false)
            setLoading(false)
            return
        }

        await api.put(`/abertura_caixa/${caixaAberto.id}`, { 
            aberto: 0,
            value: caixaAberto.value
        })
        .then(() => {
            alert("Caixa fechado")
            setModalFecharCx(false)
        })
        .catch(() => {
            alert("Erro ao fechar caixa")
            setModalFecharCx(false)
        })

        setLoading(false)
    }

    const quantidadeVagas = () => {
        let vagas_disponiveis = (park?.numero_vagas ?? 0) - (park?.vagas_ocupadas ?? 0)

        return { vagas_disponiveis }
    }

    const { vagas_disponiveis } = quantidadeVagas()

    useEffect(() => {
        if (dataClient.id_establishment) {
            verificarSeEstaAberto()
        }
    }, [dataClient.id_establishment])
    
    return (
        <InfoReservation>
            <GroupInfo>
                <Info>
                    <span>
                        <TitleLine>
                            {vagas_disponiveis}/{park?.numero_vagas ?? 0}
                        </TitleLine>
                        <Subtitle style={{ color: "#f4f4f4" }}>Vagas disponíveis</Subtitle>
                    </span>
                    <div style={{ width: 64, height: 64 }}>
                        <Doughnut
                            data={datachart}
                            options={options}
                        />
                    </div>
                </Info>
                <Info>
                    <FaRightLeft color="#545454" size={16} title="Arrow" style={styleIcon} />
                    <TextAligned>
                        <TitleLine>{formatCurrency(0, 'BRL')}</TitleLine>
                        <Subtitle>Faturamento diário</Subtitle>
                    </TextAligned>
                </Info>
                <Info>
                    <FaRightLeft color="#545454" size={16} title="Arrow" style={styleIcon} />
                    <TextAligned>
                        <TitleLine>0</TitleLine>
                        <Subtitle>Número de pessoas no dia</Subtitle>
                    </TextAligned>
                </Info>
                <Info>
                    <span>
                        <TitleLine>Sem avaliações</TitleLine>
                        <Subtitle>Satisfação do cliente</Subtitle>
                    </span>
                    <div style={{ width: 64, height: 64 }}>
                        <Doughnut
                            data={dataCliente}
                            options={optionsClient}
                        />
                    </div>
                </Info>
            </GroupInfo>
            <GroupButton>
                <GlobalButton
                    background={primaryColor}
                    children="+ Nova Reserva"
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
                funcao={createUser}
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