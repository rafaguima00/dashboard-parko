import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useUser } from "../../../../context/globalContext"
import TopForm from "../../components/topForm"
import { ContainerForm } from "../style"
import { ContentView } from "./style"
import { theme } from "../../../../theme/theme"
import FormColaborator from "./components/form"
import ListColaborators from "./components/listColaborators"
import api from "../../../../services/api/server"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../../../services/readData"
import { unLoggedIn } from "../../../../mocks/errorPage"
import ErrorPage from "../../../Error"

const ColaboratorsForm = () => {

    const { dataClient, setDataClient } = useUser()
    const { listColaborators, listReservations, loadData } = ReadApi()

    const location = useLocation()
    let selectedColaborator = location.state?.selectedColaborator

    const [unauthorized, setUnauthorized] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [selected, setSelected] = useState("none")
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
    })
    const [loading, setLoading] = useState(false)
    const [loadingDel, setLoadingDel] = useState(false)

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
        } else if (value === "Autônomo(PJ)") {
            setNewColaborator({ ...newColaborator, tipo_contratacao: 2 })
        }else if (value === "MEI") {
            setNewColaborator({ ...newColaborator, tipo_contratacao: 3 })
        }
    }

    //Adicionar colaborator (POST)
    const handleCreateColaborator = async (item) => {
        setLoading(true)

        await api.post("/colaborators", item)
        .then(() => {
            alert(`Colaborador ${item.colaborator} registrado`)
        })
        .catch(e => {
            alert(e.response.data.message)
        })
        .finally(() => {
            listColaborators(dataClient.id_establishment)
            setLoading(false)
        })
    }

    //Excluir colaborador (DELETE)
    const deleteColaborator = async (id, e) => {
        e.preventDefault()
        setLoadingDel(true)

        if(selected === "none") {
            setLoadingDel(false)
            return alert("Selecione um usuário")
        }

        if(window.confirm("Tem certeza que deseja excluir esta conta?") === true) {
            await api.delete(`/colaborators/${id}`)
            .then(() => {
                alert("Conta deletada")
                setNewColaborator({
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
                })
            })
            .catch(e => {
                alert(`Erro ao deletar conta ${e.response.data.message}`)
            })
            .finally(() => {
                listColaborators(dataClient.id_establishment)
                setLoadingDel(false)
            })
        }
    }

    //Atualizar colaborador (PUT)
    const handleUpdate = async (e, selected) => {
        e.preventDefault()
        setLoading(true)

        if(selected === "none") {
            handleCreateColaborator(newColaborator)
            return
        }

        if(selected !== "none") {
            await api.put(`/colaborators/${selected}`, newColaborator)
            .then(() => {
                alert("Usuário atualizado com sucesso.")
            })
            .catch(e => {
                alert(e.response.data.message)
            })
            .finally(() => {
                listColaborators(dataClient.id_establishment)
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            const decoded = jwtDecode(token)
            setDataClient(decoded.user)
        } else {
            setUnauthorized(true)
            setErrorMsg(unLoggedIn)
            return
        }

        if(selectedColaborator) {
            setSelected(selectedColaborator.id)
            setNewColaborator(selectedColaborator)
        }
    }, [])

    useEffect(() => {
        loadData(dataClient.id_establishment)
        listColaborators(dataClient.id_establishment)
        listReservations(dataClient.id_establishment)

        if(dataClient.type_colaborator !== "Administrador(a)"){
            setUnauthorized(true)
            setErrorMsg("Você não tem permissão para acessar esta funcionalidade")
        }
    }, [dataClient])

    if(unauthorized) {
        return <ErrorPage errorMsg={errorMsg} />
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
                        loadingDel
                    }}
                    deleteColaborator={deleteColaborator}
                />
                <FormColaborator 
                    theme={theme} 
                    state={{ 
                        selected, 
                        setSelected,
                        newColaborator,
                        setNewColaborator,
                        dataClient,
                        loading
                    }}
                    handleUpdate={handleUpdate}
                    selecionarCargo={selecionarCargo}
                    tipoContratacao={tipoContratacao}
                />
            </ContentView>
        </ContainerForm>
    )
}

export default ColaboratorsForm