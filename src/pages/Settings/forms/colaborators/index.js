import { useEffect, useState } from "react";
import { useUser } from "../../../../context/globalContext";
import TopForm from "../../components/topForm";
import { ContainerForm } from "../style";
import { ContentView } from "./style";
import { theme } from "../../../../theme/theme";
import FormColaborator from "./components/form";
import ListColaborators from "./components/listColaborators";
import api from "../../../../services/api/server";
import { jwtDecode } from "jwt-decode";
import ReadApi from "../../../../services/readData";

const ColaboratorsForm = () => {

    const { dataClient, setDataClient } = useUser();
    const { listColaborators, listReservations, loadData } = ReadApi();

    const [selected, setSelected] = useState(null);
    const [newColaborator, setNewColaborator] = useState({
        colaborator: "",
        cpf: "",
        data_nasc: "",
        e_admin: null,
        email: "",
        inicio_contrato: "",
        password: "",
        rg: "",
        tel: "",
        tipo_contratacao: null,
        unidade: dataClient.id_establishment
    });

    const selecionarCargo = (value) => {

        if(value === "Funcionário(a)") {
            setNewColaborator({ ...newColaborator, e_admin: 1 })
        } else if (value === "Coordenador(a)") {
            setNewColaborator({ ...newColaborator, e_admin: 2 })
        } else if (value === "Administrador(a)") {
            setNewColaborator({ ...newColaborator, e_admin: 3 })
        }
    }

    const tipoContratacao = (value) => {
        if(value === "Carteira assinada") {
            setNewColaborator({ ...newColaborator, tipo_contratacao: 1 })
        } else if (value === "Autônomo (PJ)") {
            setNewColaborator({ ...newColaborator, tipo_contratacao: 2 })
        }else if (value === "MEI") {
            setNewColaborator({ ...newColaborator, tipo_contratacao: 3 })
        }
    }

    //Adicionar colaborator (POST)
    const handleCreateColaborator = async (e, item) => {
        e.preventDefault();

        await api.post("/colaborators", item)
        .then(() => {
            alert(`Colaborador ${item.colaborator} registrado`);
        })
        .catch(e => {
            alert(e.response.data.message);
        })
    }

    //Excluir colaborador (DELETE)
    const deleteColaborator = async (id) => {
        if(window.confirm("Tem certeza que deseja excluir esta conta?") === true) {
            await api.delete(`/colaborators/${id}`)
            .catch(e => {
                alert(`Erro ao deletar conta ${e.response.data.message}`)
            })
        } 
    }

    //Atualizar colaborador (PUT)
    const handleUpdate = async (e, selected) => {
        e.preventDefault();

        if(selected) {
            await api.put(`/colaborators/${selected}`, newColaborator)
            .then(() => {
                alert("Usuário atualizado com sucesso.");
            })
            .catch(e => {
                alert(e.response.data.message);
            })
        } else {
            alert("Selecione um usuário para atualizar informações")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            const decoded = jwtDecode(token);
            setDataClient(decoded.user)
        }
    }, []);

    useEffect(() => {
        loadData(dataClient.id_establishment);
        listColaborators(dataClient.id_establishment);
        listReservations(dataClient.id_establishment);
    }, [dataClient]);

    return (
        <ContainerForm>
            <TopForm children="Nossos colaboradores" />
            <ContentView>
                <ListColaborators 
                    theme={theme} 
                    state={{ 
                        selected, 
                        setSelected,
                        newColaborator,
                        setNewColaborator,
                    }}
                    handleCreateColaborator={handleCreateColaborator}
                    deleteColaborator={deleteColaborator}
                />
                <FormColaborator 
                    theme={theme} 
                    state={{ 
                        selected, 
                        setSelected,
                        newColaborator,
                        setNewColaborator,
                        dataClient
                    }}
                    handleUpdate={handleUpdate}
                    selecionarCargo={selecionarCargo}
                    tipoContratacao={tipoContratacao}
                />
            </ContentView>
        </ContainerForm>
    )
}

export default ColaboratorsForm;