import { useState, useContext } from "react";
import { GlobalContext } from "../../../../context/globalContext";
import TopForm from "../../components/topForm";
import { ContainerForm } from "../style";
import { ContentView } from "./style";
import { theme } from "../../../../theme/theme";
import FormColaborator from "./components/form";
import ListColaborators from "./components/listColaborators";
import api from "../../../../services/api/server";

const ColaboratorsForm = () => {

    const { dataClient } = useContext(GlobalContext);

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

    //Adicionar colaborator (POST)
    const handleCreateColaborator = async (e, item) => {
        e.preventDefault();

        await api.post("/colaborators", item)
        .then(() => {
            console.log("tudo certo.")
        })
        .catch(e => {
            alert(e.response.data.message)
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

        await api.put(`/colaborators/${selected}`, newColaborator)
        .then(() => {
            console.log("Usuário atualizado com sucesso.")
        })
        .catch(e => {
            console.log(e.response.data.message)
        })
    }

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
                />
            </ContentView>
        </ContainerForm>
    )
}

export default ColaboratorsForm;