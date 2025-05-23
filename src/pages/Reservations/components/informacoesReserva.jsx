import ArrayInfo from "../utils/arrayInformacoes"
import { GridItems, InfoReservation } from "../style"

const InformacoesReserva = () => {
    const { gridItems } = ArrayInfo()

    return <>
        <GridItems>
            {gridItems.map(item => (
                <InfoReservation key={item.id}>
                    <strong>{item.title}:</strong>
                    <p>{item.info}</p>
                </InfoReservation>
            ))}
        </GridItems>
    </>
}

export default InformacoesReserva