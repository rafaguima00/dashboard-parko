import { 
    DivInput,
    Label,
    Input,
    InputNumber,
    DivButton,
    Select
} from "../../style"
import { FormContent, DivImage, Image } from "../style"
import avatar from "../../../../../assets/avatar.png"
import GlobalButton from "../../../../../components/Button"
import { useNavigate } from "react-router-dom"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"

const FormColaborator = (props) => {

    const { primaryColor, neutralColor, cancelColor, greenColor } = props.theme
    const { selected, newColaborator, setNewColaborator, dataClient, loading } = props.state
    const { handleUpdate, selecionarCargo, tipoContratacao } = props

    const navigate = useNavigate()

    const screenBack = () => {
        return navigate("/settings")
    }

    const cargo = [
        {
            id: 0,
            value: "",
            cargo: ""
        },
        {
            id: 1,
            value: "Funcionário",
            cargo: "Funcionário(a)"
        },
        {
            id: 2,
            value: "Coordenador",
            cargo: "Coordenador(a)"
        },
        {
            id: 3,
            value: "Administrador",
            cargo: "Administrador(a)"
        }
    ]

    const tipoContrato = [
        {
            id: 0,
            value: "",
            contrato: ""
        },
        {
            id: 1,
            value: "Assinada",
            contrato: "Carteira assinada"
        },
        {
            id: 2,
            value: "Autônomo(PJ)",
            contrato: "Autônomo(PJ)"
        },
        {
            id: 3,
            value: "MEI",
            contrato: "MEI"
        }
    ]

    const uploadImage = (e) => {
        e.preventDefault()
    }

    function formatCpf(value) {
        const rawValue = value.replace(/\D/g, "").slice(0, 11)
        
        let formattedCpf = rawValue

        if (rawValue.length > 9) {
            formattedCpf = `${rawValue.slice(0, 3)}.${rawValue.slice(3, 6)}.${rawValue.slice(6, 9)}-${rawValue.slice(9)}`
        }

        setNewColaborator({ ...newColaborator, cpf: formattedCpf })
    }

    function formatRG(value) {
        const rawValue = value.replace(/\D/g, "").slice(0, 10)
        
        let formattedRg = rawValue

        if (rawValue.length > 8) {
            formattedRg = `${rawValue.slice(0, 2)}.${rawValue.slice(2, 5)}.${rawValue.slice(5, 8)}-${rawValue.slice(8)}`
        }

        setNewColaborator({ ...newColaborator, rg: formattedRg })
    }

    function formatTel(value) {
        const rawValue = value.replace(/\D/g, '').slice(0, 11)

        let formattedPhone = rawValue

        if (rawValue.length > 7) {
            formattedPhone = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7)}`
        }

        setNewColaborator({ ...newColaborator, tel: formattedPhone })
    }

    return (
        <FormContent>
            <DivImage>
                <Image src={dataClient.image ? dataClient.image : avatar} alt="Avatar" />
                {/* <Edit 
                    background={primaryColor} 
                    onClick={e => uploadImage(e)}
                >
                    <FaRegEdit size={17} color="#fff"/>
                </Edit> */}
            </DivImage>
            
            <DivInput>
                <Label textcolor={neutralColor}>Nome Completo</Label>
                <Input 
                    type="text" 
                    placeholder="Nome"
                    bordercolor={primaryColor} 
                    largura={256}
                    required
                    value={newColaborator.colaborator}
                    onChange={e => setNewColaborator({ ...newColaborator, colaborator: e.target.value })}
                    maxLength={32}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Cargo</Label>
                <Select
                    bordercolor={primaryColor}
                    largura={256}
                    required
                    onChange={e => selecionarCargo(e.target.value)}
                    value={
                        newColaborator.e_admin === 1 ? "Funcionário(a)" :
                        newColaborator.e_admin === 2 ? "Coordenador(a)" :
                        newColaborator.e_admin === 3 ? "Administrador(a)" : ""
                    }
                >
                    {
                        cargo.map(item => (
                            <option key={item.id} value={item.cargo}>{item.cargo}</option>
                        ))
                    }
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Tipo de Contratação</Label>
                <Select
                    bordercolor={primaryColor}
                    largura={220}
                    required
                    onChange={e => tipoContratacao(e.target.value)}
                    value={
                        newColaborator.tipo_contratacao === 1 ? "Carteira assinada" :
                        newColaborator.tipo_contratacao === 2 ? "Autônomo(PJ)" :
                        newColaborator.tipo_contratacao === 3 ? "MEI" : ""
                    }
                >
                    {tipoContrato.map(item => (
                        <option key={item.id} value={item.contrato}>{item.contrato}</option>
                    ))}
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Início do Contrato</Label>
                <Input 
                    type="date" 
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={newColaborator.inicio_contrato}
                    onChange={e => setNewColaborator({ ...newColaborator, inicio_contrato: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>E-mail</Label>
                <Input 
                    type="email" 
                    placeholder="E-mail"
                    bordercolor={primaryColor}
                    largura={220}
                    required
                    value={newColaborator.email}
                    onChange={e => setNewColaborator({ ...newColaborator, email: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Senha</Label>
                <Input 
                    type="password" 
                    placeholder="Senha"
                    bordercolor={primaryColor}
                    largura={220}
                    required
                    value={newColaborator.password}
                    onChange={e => setNewColaborator({ ...newColaborator, password: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>CPF</Label>
                <InputNumber 
                    type="text"
                    placeholder="xxx.xxx.xxx-xx"
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={newColaborator.cpf}
                    onChange={e => formatCpf(e.target.value)}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>RG</Label>
                <InputNumber 
                    type="text"
                    placeholder="xx.xxx.xxx-xx"
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={newColaborator.rg}
                    onChange={e => formatRG(e.target.value)}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Data de Nascimento</Label>
                <Input 
                    type="date" 
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={newColaborator.data_nasc}
                    onChange={e => setNewColaborator({ ...newColaborator, data_nasc: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Telefone</Label>
                <InputNumber 
                    type="text"
                    placeholder="(xx) xxxxx-xxxx"
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={newColaborator.tel}
                    onChange={e => formatTel(e.target.value)}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Unidade</Label>
                <Input 
                    type="text" 
                    placeholder="Nome da Unidade"
                    bordercolor={primaryColor} 
                    largura={220}
                    value={dataClient.establishment}
                    onChange={e => setNewColaborator({ ...newColaborator, unidade: e.target.value })}
                    disabled
                    required
                />
            </DivInput>
            
            <DivButton marg={"3rem"}>
                <GlobalButton 
                    children="Cancelar"
                    background={cancelColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={screenBack}
                />
                <GlobalButton 
                    children={loading ? <Bounce /> : "Salvar"}
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={e => handleUpdate(e, selected)}
                />
            </DivButton>
        </FormContent>
    )
}

export default FormColaborator