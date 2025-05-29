import { createContext, useState, useContext } from "react"

const GlobalContext = createContext({})

export const InfoProvider = ({ children }) => {
    
    const formatoPadrao = () => {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()

        return `${day<10 ? "0"+day : day}/${month<10 ? "0"+month : month}/${year}`
    }

    const [filtrarPorData, setFiltrarPorData] = useState({
        resumo: formatoPadrao(), // Resumo de vendas (caixa)
        lista: formatoPadrao() // Lista de reservas (caixa)
    })
    const [dataClient, setDataClient] = useState({}) 
    const [park, setPark] = useState({}) 
    const [colaborators, setColaborators] = useState([]) 
    const [reservations, setReservations] = useState([]) 
    const [debts, setDebts] = useState([]) 
    const [priceTable, setPriceTable] = useState({}) 
    const [tabelaFixa, setTabelaFixa] = useState([]) 
    const [selectedClient, setSelectedClient] = useState({}) 
    const [ratings, setRatings] = useState([])
    const [occurrences, setOccurrences] = useState([])
    const [patrimonio, setPatrimonio] = useState([])
    const [accounts, setAccounts] = useState([])
    const [aportes, setAportes] = useState([])
    const [retiradas, setRetiradas] = useState([])
    const [caixaAberto, setCaixaAberto] = useState({})
    const [requests, setRequests] = useState([])
    const [resumoVendas, setResumoVendas] = useState([])
    const [reservaAppParko, setReservaAppParko] = useState(0)
    const [reservaNaoParko, setReservaNaoParko] = useState(0)
    const [formActive, setFormActive] = useState(0)
    const [occurrenceItem, setOccurrenceItem] = useState({})
    const [selected, setSelected] = useState(3)
    const [valorAPagar, setValorAPagar] = useState("")
    const [valueSelectDebt, setValueSelectDebt] = useState("")
    const [valorDoCaixa, setValorDoCaixa] = useState(0)
    const [dividasEmDinheiro, setDividasEmDinheiro] = useState([])

    const value = {
        filtrarPorData, setFiltrarPorData,
        dataClient, setDataClient, // Dados do colaborador logado no site
        selectedClient, setSelectedClient, // Informações do cliente selecionado (reservas abertas)
        park, setPark, // Dados do estabelecimento em que o colaborador trabalha
        colaborators, setColaborators, // lista de colaboradores (configurações)
        reservations, setReservations, // lista de reservas no estacionamento
        debts, setDebts, // Gerenciador de dívidas dos clientes
        priceTable, setPriceTable, // Tabela de preços (configurações)
        tabelaFixa, setTabelaFixa, // Tabela de preços fixa (configurações)
        ratings, setRatings, // Lista de notas/avaliações de clientes (Avaliações)
        occurrences, setOccurrences, // Lista de ocorrências no estacionamento (Gestão)
        patrimonio, setPatrimonio, // Lista os patrimônios no estacionamento (Gestão)
        accounts, setAccounts, // Lista de contas pagas e a pagar no estacionamento (Gestão)
        aportes, setAportes, // Aportes (caixa)
        retiradas, setRetiradas, // Retiradas (caixa)
        caixaAberto, setCaixaAberto, // Estado que retorna o valor do caixa aberto ou fechado (Tela de início)
        requests, setRequests, // Solicitação de finalização de reserva do cliente B2C 
        resumoVendas, setResumoVendas, // Resumo total de pagamentos dos clientes
        reservaAppParko, setReservaAppParko, // Número de reservas de clientes Parko
        reservaNaoParko, setReservaNaoParko, // Número de reservas de clientes não Parko
        formActive, setFormActive, // Tipo de formulário aberto (perda ticket, furto de bens cliente, furto de itens patrimônio)
        occurrenceItem, setOccurrenceItem, // Dados do formulário de ocorrência armazenados (Gestão)
        selected, setSelected, // Tópico selecionado na tela de gestão
        valorAPagar, setValorAPagar, // Valor a pagar pelas dívidas
        valueSelectDebt, setValueSelectDebt, // Forma de pagamento das dívidas
        valorDoCaixa, setValorDoCaixa, // Valor da abertura/fechamento do caixa ao vivo
        dividasEmDinheiro, setDividasEmDinheiro // Dívidas em dinheiro em espécie
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useUser = () => useContext(GlobalContext)