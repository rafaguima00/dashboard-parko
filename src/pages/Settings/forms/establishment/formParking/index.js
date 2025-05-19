import {
    DivButton,
    Form,
    DivInput,
    Label,
    Input
} from "../style"
import { useEffect, useState } from "react"
import { useUser } from "../../../../../context/globalContext"
import GlobalButton from "../../../../../components/Button"
import { useNavigate } from "react-router-dom"
import api from "../../../../../services/api/server"
import cepService from "../../../../../services/api/cep"
import { Bounce } from "react-activity"
import "react-activity/dist/library.css"

const FormParking = (props) => {

    const { neutralColor, primaryColor, cancelColor, greenColor } = props.colors
    const { park, dataClient } = useUser()
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
        email,
        numero,
        numero_vagas
    } = park
        
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
        bairro: bairro,
        numero: numero,
        numero_vagas: numero_vagas
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const screenBack = () => {
        return navigate("/settings")
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)

        await api.put(`/establishments/${dataClient.id_establishment}`, parkInfo)
        .then(() => {
            alert("As informações foram atualizadas com sucesso.")
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const atualizarCep = async ({ e }) => {
        const cep = e.target.value

        await cepService.get(`/${cep}/json/`)
        .then(response => {
            setParkInfo({
                ...parkInfo,
                end: response.data.logradouro,
                estado: response.data.uf,
                cidade: response.data.localidade,
                bairro: response.data.bairro
            })
        })
        .catch(e => {
            console.log(e)
        })
    }

    function formatTel(value) {
        const rawValue = value.replace(/\D/g, '').slice(0, 11)

        let formattedPhone = rawValue

        if (rawValue.length > 7) {
            formattedPhone = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7)}`
        }

        setParkInfo({ ...parkInfo, contato: formattedPhone })
    }

    function formatCnpj(value) {
        const rawValue = value.replace(/\D/g, '').slice(0, 14)

        let formattedCnpj = rawValue

        if (rawValue.length > 13) {
            formattedCnpj = `${rawValue.slice(0, 2)}.${rawValue.slice(2, 5)}.${rawValue.slice(5, 8)}/${rawValue.slice(8, 12)}-${rawValue.slice(12, 14)}`
        }

        setParkInfo({ ...parkInfo, cnpj: formattedCnpj })
    }

    function formatCep(value) {
        const rawValue = value.replace(/\D/g, '').slice(0, 14)

        let formattedCep = rawValue

        if(rawValue.length > 7) {
            formattedCep = `${rawValue.slice(0, 5)}-${rawValue.slice(5, 8)}`
        }

        setParkInfo({ ...parkInfo, cep: formattedCep })
    }

    function formatInscricaoEstadual(value) {
        const raw = value.replace(/\D/g, '').slice(0, 14)

        let formatted = raw

        if (raw.length > 9) {
            formatted = `${raw.slice(0,3)}.${raw.slice(3,6)}.${raw.slice(6,9)}.${raw.slice(9,12)}`
        }

        setParkInfo({ ...parkInfo, inscricao_estadual: formatted })
    }

    function formatInscricaoMunicipal(value) {
        const raw = value.replace(/\D/g, '').slice(0, 12)

        let formatted = raw
        
        if (raw.length > 8) {
            formatted = `${raw.slice(0,8)}-${raw.slice(8)}`
        }

        setParkInfo({ ...parkInfo, inscricao_municipal: formatted })
    }

    useEffect(() => {
        setParkInfo({
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
            bairro: bairro,
            numero: numero,
            numero_vagas: numero_vagas
        })
    }, [])

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
                        value={parkInfo?.razao_social ?? ""}
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
                        value={parkInfo?.name ?? ""}
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
                        value={parkInfo?.contato ?? ""}
                        onChange={e => formatTel(e.target.value)}
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
                        value={parkInfo?.cnpj ?? ""}
                        onChange={e => formatCnpj(e.target.value)}
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
                        value={parkInfo?.inscricao_estadual ?? ""}
                        onChange={e => formatInscricaoEstadual(e.target.value)}
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
                        value={parkInfo?.inscricao_municipal ?? ""}
                        onChange={e => formatInscricaoMunicipal(e.target.value)}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>E-mail</Label>
                    <Input 
                        type="email"
                        placeholder="Seu e-mail"
                        bordercolor={primaryColor} 
                        largura={670}
                        required
                        value={parkInfo?.email ?? ""}
                        onChange={e => setParkInfo({ ...parkInfo, email: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Quantidade de vagas</Label>
                    <Input 
                        type="number"
                        placeholder="Quantidade de vagas"
                        bordercolor={primaryColor} 
                        largura={324}
                        required
                        value={parkInfo?.numero_vagas ?? ""}
                        onChange={e => setParkInfo({ ...parkInfo, numero_vagas: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>CEP</Label>
                    <Input 
                        type="text"
                        placeholder="xxxxx-xxx"
                        bordercolor={primaryColor} 
                        largura={244}
                        required
                        value={parkInfo?.cep ?? ""}
                        onChange={e => formatCep(e.target.value)}
                        onBlur={(e) => atualizarCep({ e })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Endereço</Label>
                    <Input 
                        type="text"
                        placeholder="Seu Endereço"
                        bordercolor={primaryColor} 
                        largura={491}
                        required
                        value={parkInfo?.end ?? ""}
                        onChange={e => setParkInfo({ ...parkInfo, end: e.target.value })}
                    />
                </DivInput>
                <DivInput>
                    <Label textcolor={neutralColor}>Número</Label>
                    <Input 
                        type="text"
                        placeholder="Número"
                        bordercolor={primaryColor} 
                        largura={234}
                        required
                        value={parkInfo?.numero ?? ""}
                        onChange={e => setParkInfo({ ...parkInfo, numero: e.target.value })}
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
                        value={parkInfo?.estado ?? ""}
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
                        value={parkInfo?.cidade ?? ""}
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
                        value={parkInfo?.bairro ?? ""}
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
                    children={loading ? <Bounce color="#f4f4f4" /> : "Salvar"}
                    background={greenColor}
                    largura={"12rem"}
                    altura={"2.8rem"}
                    aoPressionar={handleUpdate}
                />
            </DivButton>
        </>
    )
}

export default FormParking