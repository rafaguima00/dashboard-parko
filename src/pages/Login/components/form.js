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
import { useForm } from "react-hook-form";
import validator from "validator";
import { theme } from "../../../theme/theme";

const Form = () => {

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState("");

    const { setDataClient, dataClient } = useContext(GlobalContext);

    const { primaryColor } = theme;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { email, password } = data;

        if(email === "rafael@email.com" && password === '123456') {
            const date = new Date().toLocaleString();

            setDataClient({ 
                ...dataClient, 
                username: "Rafael Moreira",
                email: email,
                password: password,
                login: date
            })
            return navigate("/start")
        } else {
            setError(true)
            setMessageError("E-mail ou senha incorretos")
        }
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
                            {...register("email", {
                                required: true,
                                validate: (value) => validator.isEmail(value)
                            })}
                        />
                        {errors?.email?.type === "required" &&
                            <MessageError>E-mail é obrigatório</MessageError>
                        }
                        {errors?.email?.type === "validate" &&
                            <MessageError>E-mail inválido</MessageError>
                        }
                    </TextField>
                    <TextField>
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            required
                            {...register("password", {
                                required: true,
                                minLength: 6
                            })}
                        />
                        {errors?.password?.type === "required" &&
                            <MessageError>Senha é obrigatória</MessageError>
                        }
                        {errors?.password?.type === "minLength" &&
                            <MessageError>A senha deve conter 6 ou mais caracteres</MessageError>
                        }
                    </TextField>
                </div>
                { error &&
                    <MessageError>{messageError}</MessageError>
                }
                <NewPassword>
                    <TextPassword textColor={primaryColor}>Esqueceu a senha?</TextPassword>
                    <BtPassword>Crie uma nova</BtPassword>
                </NewPassword>
                <Login buttonColor={primaryColor} type="submit" onClick={() => handleSubmit(onSubmit)()}>Login</Login>
            </FormContent>
        </AreaForm>
    )
}

export default Form;