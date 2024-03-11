import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/globalContext";
import {
    InfoReservation,
    GroupInfo,
    TitleLine,
    Subtitle,
    Info,
    TextAligned,
    GroupButton
} from "../style";
import { formatCurrency } from "../../../services/formatCurrency";
import { CgNotes } from "react-icons/cg";
import { FaRightLeft } from "react-icons/fa6";
import GlobalButton from "../../../components/button/button";
import { theme } from "../../../theme/theme";
import { Chart as ChartJS, ArcElement, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { datachart, options } from "../datasets/doughnut";
import { dataCliente, optionsClient } from "../datasets/dgClientSatisfation";
import Modal from "../../../components/Modal";
import NewReservation from "../form/newReservation";
import api from "../../../services/api/server";

ChartJS.register(ArcElement, Title);

const InfoReserve = () => {

    const heightButton = "2.4rem";

    const styleIcon = {
        position: "absolute",
        right: 0,
        top: 0,
        margin: 10
    }

    const { primaryColor, cancelColor } = theme;

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);

    const { dataClient } = useContext(GlobalContext);

    //função para guardar os dados de todos os veículos cadastrados na const 'vehicles'
    const verifyVehicles = async () => {
        await api.get("/vehicles")
        .then(response => {
            setVehicles(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    //função para guardar os dados de todos os usuários cadastrados na const 'users'
    const verifyUsers = async () => {
        await api.get("/users")
        .then(response => {
            setUsers(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    //1- pegar as informações do usuário e criar no banco de dados
    const createUser = async () => {
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
            const idUser = users.at(-1).id;
            createVehicle(idUser);
        })
        .catch(e => {
            console.log(e);
        })
    }

    //2- pegar as informações do veículo e criar no banco de dados
    const createVehicle = async (id) => {
        await api.post("/vehicles", {
            id_costumer: id+1, 
            name_vehicle: data.name_vehicle, 
            color: data.color,
            license_plate: data.license_plate
        })
        .then(() => {
            createReservation();
        })
        .catch(e => {
            console.log(e);
        })
        .finally(() => {
            setOpen(false)
        })
    }

    //3- feito isso, cadastrar a reserva no banco de dados
    const createReservation = async () => {
        const idUser = users.at(-1).id+1;
        const idVehicle = vehicles.at(-1).id+1;
        await api.post("/reservations", {
            data_entrada: data.data_entrada,
            hora_entrada: data.hora_entrada,
            data_saida: data.data_entrada, //A data de saída é a mesma da entrada
            hora_saida: data.hora_saida,
            value: 10, 
            id_costumer: idUser,
            id_vehicle: idVehicle, 
            id_establishment: dataClient.id_establishment 
        })
        .then(() => {
            console.log("Operação realizada com sucesso")
        })
        .catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        verifyVehicles();
        verifyUsers();
    }, []);

    return (
        <InfoReservation>
            <GroupInfo>
                <Info>
                    <span>
                        <TitleLine>xx/xx</TitleLine>
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
                    <CgNotes color="#545454" size={16} title="Checkout" style={styleIcon} />
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
                        <TitleLine>n/a</TitleLine>
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
                />
                <GlobalButton
                    background={cancelColor}
                    children="Fechar Caixa"
                    altura={heightButton}
                />
            </GroupButton>
            <Modal 
                isOpen={open} 
                setOpen={setOpen} 
                title={"Nova Reserva"}
                maxWidth={"52rem"}
                funcao={createUser}
            >
                <NewReservation 
                    state={{
                        data, 
                        setData,
                        vehicles,
                        setVehicles
                    }}
                />
            </Modal>
        </InfoReservation>
    )
}

export default InfoReserve;