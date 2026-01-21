import { useEffect } from "react"
import { useUser } from "../../../../../../../../context/globalContext"
import useReservation from "../../../../../../../../hooks/useReservation"
import { Head, ItemTable, Th, AllTable } from "../../style"
import { formatCurrency } from "../../../../../../../../utils/FormatCurrency"
import usePayment from "../../../../../../../../hooks/usePayment"
import api from "../../../../../../../../services/api/server"

const GeralDeFaturamento = () => {

    const { fetchReservations } = useReservation()
    const { fetchPayments } = usePayment()
    const { reservations, park, resumoVendas, debts, setDebts, dataClient } = useUser()

    const typeOfCharge = (type_of_charge) => {
        if (type_of_charge === "hora_fracao") return "Fração da Hora"

        if (type_of_charge === "tabela_fixa") return "Tabela Fixa"
    }

    const filial = () => {
        const item = park.cnpj.split("/")
        return item[1]
    }

    const modCliente = (parko_app) => {
        if (parko_app === 1) return "App"

        if (parko_app === 0) return "Estabelecimento"
    }

    const vehicle = (item) => {
        return `${item.name_vehicle} ${item.color}`
    }

    const filterReservations = (id) => {
        const filter = reservations.filter(item => item.id === id)
        const [day, month, year] = filter[0].data_entrada.split("/")
        const [dia, mes, ano] = filter[0].data_saida.split("/")

        const dataEntradaMs = new Date(`${year}-${month}-${day}, ${filter[0].hora_entrada}`).getTime()
        const dataSaidaMs = new Date(`${ano}-${mes}-${dia}, ${filter[0].hora_saida}`).getTime()
        const diferencaMs = dataSaidaMs - dataEntradaMs
        const totalSegundos = Math.floor(diferencaMs / 1000)

        const horas = Math.floor(totalSegundos / 3600)
        const minutos = Math.floor((totalSegundos % 3600) / 60)
        const segundos = totalSegundos % 60

        const tempoFormatado = 
            String(horas).padStart(2, '0') + ':' +
            String(minutos).padStart(2, '0') + ':' +
            String(segundos).padStart(2, '0');

        return tempoFormatado
    }

    const qtdHoras = (id) => {
        const filter = reservations.filter(item => item.id === id)
        const [day, month, year] = filter[0]?.data_entrada.split("/")
        const [dia, mes, ano] = filter[0]?.data_saida.split("/")

        const dataEntradaMs = new Date(`${year}-${month}-${day}, ${filter[0]?.hora_entrada}`).getTime()
        const dataSaidaMs = new Date(`${ano}-${mes}-${dia}, ${filter[0]?.hora_saida}`).getTime()
        const diferencaMs = dataSaidaMs - dataEntradaMs
        const totalSegundos = Math.floor(diferencaMs / 1000)

        const horas = Math.floor(totalSegundos / 3600)
        return horas
    }

    const qtdFracaoHora = (id) => {
        const filter = reservations.filter(item => item.id === id)
        const [day, month, year] = filter[0].data_entrada.split("/")
        const [dia, mes, ano] = filter[0].data_saida.split("/")

        const dataEntradaMs = new Date(`${year}-${month}-${day}, ${filter[0].hora_entrada}`).getTime()
        const dataSaidaMs = new Date(`${ano}-${mes}-${dia}, ${filter[0].hora_saida}`).getTime()
        const diferencaMs = dataSaidaMs - dataEntradaMs
        const totalSegundos = Math.floor(diferencaMs / 1000)

        const minutos = Math.floor((totalSegundos % 3600) / 60)

        const milissegundos = minutos * 60 * 1000 
        const fracaoMilissegundos = milissegundos / 3600000

        return fracaoMilissegundos.toFixed(2).replace(".", ",")
    }

    const valorPago = (id_reservation) => {
        const filterPayments = resumoVendas.filter(item => item.id_reservation === id_reservation)
        return filterPayments[0]?.value_paid ? formatCurrency(filterPayments[0]?.value_paid, "BRL") : "N/A"
    }

    const formaPgto = (id_reservation) => {
        const filterPayments = resumoVendas.filter(item => item.id_reservation === id_reservation)

        if (filterPayments[0]?.payment_method === "money") return "Dinheiro"

        if (filterPayments[0]?.payment_method === "pix") return "Pix"

        if (filterPayments[0]?.payment_method === "credit_card") return "Cartão de crédito"

        if (filterPayments[0]?.payment_method === "debit_card") return "Cartão de débito"

        return "A pagar"
    }

    const saldoAReceber = (id_reservation) => {
        const filterPayments = resumoVendas.filter(item => item.id_reservation === id_reservation)
        const saldo = filterPayments[0]?.value_paid - filterPayments[0]?.value

        return formatCurrency(saldo, 'BRL')
    }

    const calcularDividas = async () => {
        const response = await api.get(`/debts/${dataClient.id_establishment}`)
        setDebts(response.data)
    }

    const filtrarDividas = (id_reservation) => {
        const geralDividas = debts.filter(item => item.id_reservation === id_reservation && item.status === 1)

        return geralDividas[0] ? formatCurrency(geralDividas[0]?.value, 'BRL') : formatCurrency(0, 'BRL')
    }

    const ticketMedio = (id_customer) => {
        const filtrar = resumoVendas.filter(item => item.id_customer === id_customer)
        const mapValores = filtrar.map(item => Number(item.value))

        const soma = mapValores.reduce((prev, current) => prev + current, 0)

        if (mapValores.length === 0) {
            return formatCurrency(0, 'BRL')
        }

        const ticketMedio = soma / mapValores.length
        return formatCurrency(Number(ticketMedio.toFixed(2)), 'BRL')
    }

    const perfilCliente = (id_customer) => {
        const clienteParko = reservations.some(item => item.id_costumer === id_customer && item.parko_app === 1)

        if (clienteParko === true) return "Rotativo"

        const buscarCliente = debts.some(item => item.id_costumer === id_customer)

        if (buscarCliente === true) return "Rotativo"

        return "Mensalista"
    }

    useEffect(() => {
        fetchReservations()
        fetchPayments()
        calcularDividas()
    }, [])
    
    return <>
        <AllTable>
            <Head textcolor="#bababa">
                <tr>
                    <Th>Cliente</Th>
                    <Th>Empresa</Th>
                    <Th>Filial</Th>
                    <Th>Tipo tarifa</Th>
                    <Th>Mod. Cliente</Th>
                    <Th>Data de entrada</Th>
                    <Th>Hora de entrada</Th>
                    <Th>Veículo</Th>
                    <Th>Placa</Th>
                    <Th>Perfil Cliente</Th>
                    <Th>Data de saída</Th>
                    <Th>Hora de saída</Th>
                    <Th>Permanência total</Th>
                    <Th>Qtd. horas</Th>
                    <Th>Qtd. fração da hora</Th>
                    <Th>Valor total</Th>
                    <Th>Ticket médio</Th>
                    <Th>Dívidas/Crédito</Th>
                    <Th>Valor pago</Th>
                    <Th>Forma pgto</Th>
                    <Th>Saldo a receber</Th>
                </tr>
            </Head>
            <tbody>
                {reservations.map(item => (
                    <tr>
                        <ItemTable>{item.name}</ItemTable>
                        <ItemTable>{item.establishment}</ItemTable>
                        <ItemTable>{filial()}</ItemTable>
                        <ItemTable>{typeOfCharge(item.type_of_charge)}</ItemTable>
                        <ItemTable>{modCliente(item.parko_app)}</ItemTable>
                        <ItemTable>{item.data_entrada}</ItemTable>
                        <ItemTable>{item.hora_entrada}</ItemTable>
                        <ItemTable>{vehicle(item)}</ItemTable>
                        <ItemTable>{item.license_plate}</ItemTable>
                        <ItemTable>{perfilCliente(item.id_costumer)}</ItemTable>
                        <ItemTable>{item.data_saida}</ItemTable>
                        <ItemTable>{item.hora_saida}</ItemTable>
                        <ItemTable>{filterReservations(item.id)}</ItemTable>
                        <ItemTable>{qtdHoras(item.id)}</ItemTable>
                        <ItemTable>{qtdFracaoHora(item.id)}</ItemTable>
                        <ItemTable>{formatCurrency(item.value, 'BRL')}</ItemTable>
                        <ItemTable>{ticketMedio(item.id_costumer)}</ItemTable>
                        <ItemTable>{filtrarDividas(item.id)}</ItemTable>
                        <ItemTable>{valorPago(item.id)}</ItemTable>
                        <ItemTable>{formaPgto(item.id)}</ItemTable>
                        <ItemTable>{saldoAReceber(item.id)}</ItemTable>
                    </tr>
                ))}
            </tbody>
        </AllTable>
    </>
}

export default GeralDeFaturamento