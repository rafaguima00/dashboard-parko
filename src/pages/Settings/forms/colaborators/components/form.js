import { 
    DivInput,
    Label,
    Input,
    InputNumber,
    DivButton,
    Select
} from "../../style";
import { 
    FormContent,
    DivImage, 
    Image, 
    Edit
} from "../style";
import avatar from "../../../../../assets/avatar.png";
import { FaRegEdit } from "react-icons/fa";
import GlobalButton from "../../../../../components/button/button";
import { useNavigate } from "react-router-dom";

const FormColaborator = (props) => {

    const { primaryColor, neutralColor, cancelColor, greenColor } = props.theme;
    const { selected, newColaborator, setNewColaborator, dataClient } = props.state;
    const { handleUpdate, selecionarCargo, tipoContratacao } = props;

    const navigate = useNavigate();

    const screenBack = () => {
        return navigate("/settings")
    }

    const cargo = [
        {
            id: 0,
            cargo: ""
        },
        {
            id: 1,
            cargo: "Funcionário(a)"
        },
        {
            id: 2,
            cargo: "Coordenador(a)"
        },
        {
            id: 3,
            cargo: "Administrador(a)"
        }
    ]

    const tipoContrato = [
        {
            id: 0,
            cargo: ""
        },
        {
            id: 1,
            contrato: "Carteira assinada"
        },
        {
            id: 2,
            contrato: "Autônomo (PJ)"
        },
        {
            id: 3,
            contrato: "MEI"
        }
    ]

    const telDigitado = newColaborator.tel;
    const formataTel = telDigitado.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');

    return (
        <FormContent>
            <DivImage>
                <Image src={avatar} alt="Avatar" />
                <Edit background={primaryColor} onClick={e => e.preventDefault()}>
                    <FaRegEdit size={17} color="#fff"/>
                </Edit>
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
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Cargo</Label>
                <Select
                    bordercolor={primaryColor}
                    largura={256}
                    required
                    onChange={e => selecionarCargo(e.target.value)}
                >
                    {cargo.map(item => (
                        <option key={item.id}>{item.cargo}</option>
                    ))}
                </Select>
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>Tipo de Contratação</Label>
                <Select
                    bordercolor={primaryColor}
                    largura={220}
                    required
                    onChange={e => tipoContratacao(e.target.value)}
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
                    type="number"
                    placeholder="xxx.xxx.xxx-xx"
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={newColaborator.cpf}
                    onChange={e => setNewColaborator({ ...newColaborator, cpf: e.target.value })}
                />
            </DivInput>
            <DivInput>
                <Label textcolor={neutralColor}>RG</Label>
                <InputNumber 
                    type="number"
                    placeholder="xx.xxx.xxx-xx"
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={newColaborator.rg}
                    onChange={e => setNewColaborator({ ...newColaborator, rg: e.target.value })}
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
                    type="number"
                    placeholder="(xx) xxxxx-xxxx"
                    bordercolor={primaryColor} 
                    largura={220}
                    required
                    value={formataTel}
                    onChange={e => setNewColaborator({ ...newColaborator, tel: e.target.value })}
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
                    children="Salvar"
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={e => handleUpdate(e, selected)}
                />
            </DivButton>
        </FormContent>
    )
}

export default FormColaborator;