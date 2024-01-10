import { useState } from "react";
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

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title);

const Checkout = () => {

    const { primaryColor, neutralColor } = theme;

    const [open, setOpen] = useState(false);
    const [openRetirada, setOpenRetirada] = useState(false);

    return (
        <Container>
            <FirstHeader />
            <SummaryContent />
            <SecondHeader />
            <ListReserve />
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
            >
                <Contribution neutralColor={neutralColor} primaryColor={primaryColor} />
            </Modal>
            <Modal
                isOpen={openRetirada}
                setOpen={setOpenRetirada}
                title={"Retirada de Dinheiro"}
                maxWidth={"30rem"}
            >
                <Retirada neutralColor={neutralColor} primaryColor={primaryColor} />
            </Modal>
        </Container>
    )
}

export default Checkout;