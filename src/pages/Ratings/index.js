import {
    Container
} from "./style";
import Rate from "./components/rate";
import Top from "../../components/top/top";
import api from "../../services/api/server";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

const Ratings = () => {

    const { ratings, setRatings, dataClient } = useContext(GlobalContext);

    const recuperarDados = async () => {
        await api.get("/ratings")
        .then(res => {
            setRatings(res.data);
        })
        .catch(e => {
            console.log(e);
        })
    };

    useEffect(() => {
        recuperarDados();
    }, []);

    return (
        <Container>
            <Top children="Avaliações" font={19} />
            <Rate ratings={ratings} dataClient={dataClient}/>
        </Container>
    )
}

export default Ratings;