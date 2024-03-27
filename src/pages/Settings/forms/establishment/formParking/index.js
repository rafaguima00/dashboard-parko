import {
    DivButton,
    Form,
    DivInput,
    Label,
    Input
} from "../style";
import { useState } from "react";
import { useUser } from "../../../../../context/globalContext";
import GlobalButton from "../../../../../components/button";
import { useNavigate } from "react-router-dom";
import api from "../../../../../services/api/server";
import cepService from "../../../../../services/api/cep";

const FormParking = (props) => {

    const { neutralColor, primaryColor, cancelColor, greenColor } = props.colors;
    const { park, dataClient } = useUser();
    const { 
        razao_social, 
        name,
        contato,
        cnpj,
        inscricao_estadual,
        inscricao_municipal,
        end,
        cep,
        estado,
        cidade,
        bairro,
        email
    } = park;

    const [parkInfo, setParkInfo] = useState({
        razao_social: razao_social, 
        name: name,
        contato: contato,
        email: email,
        cnpj: cnpj,
        inscricao_estadual: inscricao_estadual,
        inscricao_municipal: inscricao_municipal,
        end: end,
        cep: cep,
        estado: estado,
        cidade: cidade,
        bairro: bairro
    });

    const navigate = useNavigate();

    const screenBack = () => {
        return navigate("/settings")
    }

    const handleUpdate = async () => {
        await api.patch(`/establishments/${dataClient.id_establishment}`, parkInfo)
        .then(() => {
            alert("As informações foram atualizadas com sucesso.")
        })
        .catch(e => {
            console.log(e);
        });
    }

    const atualizarCep = async ({ e }) => {
        const cep = e.target.value;

        await cepService.get(`/${cep}/json/`)
        .then(response => {
            setParkInfo({
                end: response.data.logradouro,
                estado: response.data.uf,
                cidade: response.data.localidade,
                bairro: response.data.bairro
            });
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <>
            <Form>
                <DivInput>
                    <Label textcolor={neutralColor}>Razão Social</Label>
                    <Input 
                        type="text"
                        placeholder="Sua Razão Social"
                        bordercolor={primaryColor} 
                        largura={255}
                        required
                        value={parkInfo.razao_social}
                        onChange={e => setParkInfo({ ...parkInfo, razao_social: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Nome do Estabelecimento</Label>
                    <Input 
                        type="text"
                        placeholder="Nome"
                        bordercolor={primaryColor} 
                        largura={487}
                        required
                        value={parkInfo.name}
                        onChange={e => setParkInfo({ ...parkInfo, name: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Contato</Label>
                    <Input 
                        type="text"
                        placeholder="Ex.: (71) 98888-5555"
                        bordercolor={primaryColor} 
                        largura={242}
                        required
                        value={parkInfo.contato}
                        onChange={e => setParkInfo({ ...parkInfo, contato: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>CNPJ</Label>
                    <Input 
                        type="text"
                        placeholder="Seu CNPJ"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        disabled
                        value={parkInfo.cnpj}
                        onChange={e => setParkInfo({ ...parkInfo, cnpj: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Inscrição Estadual</Label>
                    <Input 
                        type="text"
                        placeholder="xxxxxxxxxxx"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        disabled
                        value={parkInfo.inscricao_estadual}
                        onChange={e => setParkInfo({ ...parkInfo, inscricao_estadual: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Inscrição Municipal</Label>
                    <Input 
                        type="text"
                        placeholder="xxxxxxxxxxx"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        disabled
                        value={parkInfo.inscricao_municipal}
                        onChange={e => setParkInfo({ ...parkInfo, inscricao_municipal: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>E-mail</Label>
                    <Input 
                        type="text"
                        placeholder="Seu e-mail"
                        bordercolor={primaryColor} 
                        largura={670}
                        required
                        value={parkInfo.email}
                        onChange={e => setParkInfo({ ...parkInfo, email: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Endereço</Label>
                    <Input 
                        type="text"
                        placeholder="Seu Endereço"
                        bordercolor={primaryColor} 
                        largura={670}
                        required
                        value={parkInfo.end}
                        onChange={e => setParkInfo({ ...parkInfo, end: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>CEP</Label>
                    <Input 
                        type="text"
                        placeholder="xxxxx-xxx"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        value={parkInfo.cep}
                        onChange={e => setParkInfo({ ...parkInfo, cep: e.target.value })}
                        onBlur={(e) => atualizarCep({ e })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Estado</Label>
                    <Input 
                        type="text"
                        placeholder="Estado"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        value={parkInfo.estado}
                        onChange={e => setParkInfo({ ...parkInfo, estado: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Cidade</Label>
                    <Input 
                        type="text"
                        placeholder="Cidade"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        value={parkInfo.cidade}
                        onChange={e => setParkInfo({ ...parkInfo, cidade: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Bairro</Label>
                    <Input 
                        type="text"
                        placeholder="Bairro"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        value={parkInfo.bairro}
                        onChange={e => setParkInfo({ ...parkInfo, bairro: e.target.value })}
                    />
                </DivInput>
            </Form>
            
            <DivButton>
                <GlobalButton 
                    children="Cancelar"
                    background={cancelColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={screenBack}
                />
                <GlobalButton 
                    children="Salvar"
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={handleUpdate}
                />
            </DivButton>
        </>
    )
}

export default FormParking;