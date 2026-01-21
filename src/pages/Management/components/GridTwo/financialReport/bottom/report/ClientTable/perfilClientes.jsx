import { useEffect } from "react"
import { useUser } from "../../../../../../../../context/globalContext"
import useReservation from "../../../../../../../../hooks/useReservation"
import { AllTable, Head, ItemTable, Th } from "../../style"
import { formatCurrency } from "../../../../../../../../utils/FormatCurrency"
import { unformatCurrency } from "../../../../../../../../utils/UnformatCurrency"

const PerfilClientes = () => {

    const { fetchReservations } = useReservation()
    const { reservations } = useUser()

    const clienteRotativo = () => {
        const clienteParko = reservations.filter(item => item.parko_app === 1)
        const mapValue = clienteParko.map(item => item.value)
        const somarValores = mapValue.reduce((prev, current) => {
            return prev + current
        })
        
        return formatCurrency(somarValores, 'BRL')
    }

    const clienteRotativoNaoParko = () => {
        const clienteParko = reservations.filter(item => item.parko_app === 0)
        
        // Conta quantas vezes cada id_costumer aparece
        const contador = clienteParko.reduce((acc, item) => {
            acc[item.id_costumer] = (acc[item.id_costumer] || 0) + 1
            return acc
        }, {})

        // Filtra apenas os que têm id_costumer repetido
        const repetidos = clienteParko.filter(
            item => contador[item.id_costumer] === 1
        )
        
        const mapRepetidos = repetidos.map(item => item.value)
        const somarValores = mapRepetidos.reduce((prev, current) => {
            return prev + current
        })

        return formatCurrency(somarValores, 'BRL')

    }

    const clienteMensalista = () => {
        const clienteParko = reservations.filter(item => item.parko_app === 0)

        // Conta quantas vezes cada id_costumer aparece
        const contador = clienteParko.reduce((acc, item) => {
            acc[item.id_costumer] = (acc[item.id_costumer] || 0) + 1
            return acc
        }, {})

        // Filtra apenas os que têm id_costumer repetido
        const repetidos = clienteParko.filter(
            item => contador[item.id_costumer] > 1
        )

        const mapRepetidos = repetidos.map(item => item.value)
        const somarValores = mapRepetidos.reduce((prev, current) => {
            return prev + current
        })

        return formatCurrency(somarValores, 'BRL')
    }

    const rotativo = clienteRotativo()
    const rotativoNaoParko = clienteRotativoNaoParko()
    const mensalista = clienteMensalista()

    const desformatar = () => {
        const unformatRotativo = unformatCurrency(rotativo) / 100
        const unformatRotativoNaoParko = unformatCurrency(rotativoNaoParko) / 100
        const unformatMensalista = unformatCurrency(mensalista) / 100

        const total = unformatRotativo + unformatRotativoNaoParko + unformatMensalista
        return formatCurrency(total, 'BRL')
    }

    useEffect(() => {
        fetchReservations()
    }, [])

    return <>
        <AllTable>
            <Head largura={"100%"} textcolor="#bababa">
                <tr>
                    <Th>Perfil de cliente</Th>
                    <Th>Valor</Th>
                </tr>
            </Head>
            <tbody>
                <tr>
                    <ItemTable>Rotativo (Parko)</ItemTable>
                    <ItemTable>{rotativo}</ItemTable>
                </tr>
                <tr>
                    <ItemTable>Rotativo (Não parko)</ItemTable>
                    <ItemTable>{rotativoNaoParko}</ItemTable>
                </tr>
                <tr>
                    <ItemTable>Mensalista (Não parko)</ItemTable>
                    <ItemTable>{mensalista}</ItemTable>
                </tr>
                <tr>
                    <ItemTable>Total geral</ItemTable>
                    <ItemTable>{desformatar()}</ItemTable>
                </tr>
            </tbody>
        </AllTable>
    </>
}

export default PerfilClientes