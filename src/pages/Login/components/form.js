import {
    AreaForm,
    FormContent,
    TextField,
    Label,
    Input,
    MessageError,
    NewPassword,
    TextPassword,
    BtPassword,
    Login
} from "../style";
import { useState, useContext } from "react";
import { GlobalContext } from "../../../context/globalContext";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme/theme";
import api from "../../../services/api/server";

const Form = () => {

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState("");

    const { 
        setDataClient, 
        dataClient, 
        setPark, 
        setColaborators,
    } = useContext(GlobalContext);
    const { primaryColor } = theme;

    const navigate = useNavigate();

    const loadData = async () => {
        await api.get(`/establishments/${dataClient.id_establishment}`)
        .then(response => {
            setPark(response.data[0]);
        })
        .catch(e => {
            console.log(e)
        })
    }

    const listColaborators = async () => {
        await api.get(`/colaborators/${dataClient.id_establishment}`)
        .then(response => {
            setColaborators(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        await api.post("/colaborators/login", {
            email: dataClient.email,
            password: dataClient.password
        })
        .then(response => {    
            console.log(response);
            setDataClient(response.data);
            loadData();
            listColaborators();
            return navigate("/start");
        })
        .catch(e => {
            if(e.response.status === 400) {
                setError(true)
                setMessageError(e.response.data.message)
            }
        })
    }

    return (
        <AreaForm>
            <FormContent>
                <div>
                    <TextField>
                        <Label>E-mail</Label>
                        <Input
                            type="email"
                            placeholder="Digite seu e-mail"
                            required
                            onChange={e => setDataClient({ ...dataClient, email: e.target.value })}
                        />
                    </TextField>
                    <TextField>
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            required
                            onChange={e => setDataClient({ ...dataClient, password: e.target.value })}
                        />
                    </TextField>
                </div>
                { error &&
                    <MessageError>{messageError}</MessageError>
                }
                <NewPassword>
                    <TextPassword textcolor={primaryColor}>Esqueceu a senha?</TextPassword>
                    <BtPassword>Crie uma nova</BtPassword>
                </NewPassword>
                <Login btcolor={primaryColor} type="submit" onClick={(e) => handleLogin(e)}>Login</Login>
            </FormContent>
        </AreaForm>
    )
}

export default Form;