import { useState, useEffect } from "react";
import { useUser } from "../../context/globalContext";
import { Container, Graphics } from "./style";
import Buttons from "./components/buttons";
import FirstHeader from "./components/firstHeader";
import SecondHeader from "./components/secondHeader";
import SummaryContent from "./components/summaryContent";
import ListReserve from "./components/list";
import { theme } from "../../theme/theme";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import { Doughnut, Bar } from 'react-chartjs-2';
import { data, options, plugins } from "./datasets/doughnut";
import { dataBar, optionsBar } from "./datasets/bar";
import Modal from "../../components/Modal";
import Contribution from "./form/contribution";
import Retirada from "./form/retirada";
import api from "../../services/api/server";
import ReadApi from "../../services/readData";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title);

const Checkout = () => {

    const { primaryColor, neutralColor } = theme;
    const { reservations, dataClient, aportes, retiradas } = useUser();
    const { readAportes, readRetiradas, listReservations } = ReadApi();

    const [open, setOpen] = useState(false);
    const [openRetirada, setOpenRetirada] = useState(false);
    const [novoAporte, setNovoAporte] = useState({});
    const [novaRetirada, setNovaRetirada] = useState({});
    const [text, setText] = useState("");

    const reservaConfirmada = reservations.filter(item => item.status === "Confirmado");
    const filterReserv = reservaConfirmada.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.license_plate.toLowerCase().includes(text.toLowerCase())
    );

    const calcularValorPorEstacionamento = (data, idEstacionamento) => {

        const filtrarItem = (array) => array.filter(item => item.id_establishment === idEstacionamento);

        const calcularSoma = (array) => array.map(item => item.value)
        .reduce((prev, current) => {
            return prev + current;
        }, 0); 

        const valoresTotal = calcularSoma(data);

        const findIdAportes = filtrarItem(aportes);
        const valoresAporte = calcularSoma(findIdAportes);

        const findIdRetiradas = filtrarItem(retiradas);
        const valoresRetiradas = calcularSoma(findIdRetiradas);

        let aberturaCaixa = valoresTotal + valoresAporte;
        let fechamentoCaixa = aberturaCaixa - valoresRetiradas;

        return { valoresTotal, fechamentoCaixa, aberturaCaixa, valoresAporte, valoresRetiradas };
    };

    const criarAporte = async (setOpen) => {
        await api.post("/aportes", {
            id_establishment: dataClient.id_establishment,
            id_colaborator: dataClient.id,
            created_at: novoAporte.created_at,
            value: novoAporte.value,
            description: novoAporte.description
        })
        .then(() => {
            alert("Aporte realizado com sucesso");
            setOpen(false);
        })
        .catch(e => {
            console.log(e);
        })
    };

    const criarRetirada = async (setOpenRetirada) => {
        await api.post("/retiradas", {
            id_establishment: dataClient.id_establishment,
            id_colaborator: dataClient.id,
            created_at: novaRetirada.created_at,
            value: novaRetirada.value,
            description: novaRetirada.description
        })
        .then(() => {
            alert("Retirada realizada com sucesso");
            setOpenRetirada(false);
        })
        .catch(e => {
            console.log(e);
        })
    };

    useEffect(() => {
        readRetiradas();
        readAportes();
    }, [aportes, retiradas]);

    const { 
        valoresTotal, 
        fechamentoCaixa, 
        aberturaCaixa, 
        valoresAporte, 
        valoresRetiradas 
    } = calcularValorPorEstacionamento(reservations, dataClient.id_establishment);

    return (
        <Container>
            <FirstHeader />
            <SummaryContent 
                resumo={{
                    aberturaCaixa,
                    valoresTotal,
                    valoresAporte,
                    valoresRetiradas,
                    fechamentoCaixa
                }}
            />
            <SecondHeader states={{ text, setText }} />
            <ListReserve reservaConfirmada={filterReserv} />
            <Buttons setOpen={setOpen} setOpenRetirada={setOpenRetirada}/>

            <Graphics background={primaryColor}>
                <div style={{ padding: 10 }}>
                    <Bar 
                        data={dataBar}
                        options={optionsBar}
                    />
                </div>
                <div style={{ padding: 10 }}>
                    <Doughnut
                        data={data}
                        options={options}
                        plugins={plugins}
                    />
                </div>
            </Graphics>

            <Modal
                isOpen={open}
                setOpen={setOpen}
                title={"Aporte de Dinheiro"}
                maxWidth={"30rem"}
                funcao={() => criarAporte(setOpen)}
            >
                <Contribution 
                    neutralColor={neutralColor} 
                    primaryColor={primaryColor} 
                    state={{
                        setNovoAporte,
                        novoAporte
                    }}
                />
            </Modal>
            
            <Modal
                isOpen={openRetirada}
                setOpen={setOpenRetirada}
                title={"Retirada de Dinheiro"}
                maxWidth={"30rem"}
                funcao={() => criarRetirada(setOpenRetirada)}
            >
                <Retirada 
                    neutralColor={neutralColor} 
                    primaryColor={primaryColor} 
                    state={{
                        setNovaRetirada,
                        novaRetirada
                    }}
                />
            </Modal>

        </Container>
    )
}

export default Checkout;