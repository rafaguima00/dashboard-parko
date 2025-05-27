import useReservation from "../../../hooks/useReservation"
import { GridItems, InfoReservation } from "../style"

const InformacoesReserva = () => {

    const { getGridItems } = useReservation()
    const gridItems = getGridItems()

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