import { GridItems, InfoReservation } from "../style"

const InformacoesReserva = (props) => {

    const { selectedClient } = props

    return <>
        <GridItems>
            <InfoReservation>
                <strong>Número reserva: </strong>
                <p>{selectedClient?.id ?? ""}</p>
            </InfoReservation>
            <InfoReservation>
                <strong>Placa: </strong>
                <p>{selectedClient?.license_plate ?? ""}</p>
            </InfoReservation>
            <InfoReservation>
                <strong>Cliente: </strong>
                <p>{selectedClient?.name ?? ""}</p>
            </InfoReservation>
            <InfoReservation>
                <strong>Entrada: </strong>
                <p>{selectedClient?.hora_entrada ?? ""}</p>
            </InfoReservation>
            <InfoReservation>
                <strong>Veículo: </strong>
                <p>{selectedClient?.name_vehicle ?? ""}</p>
            </InfoReservation>
            <InfoReservation>
                <strong>Saída: </strong>
                <p>{selectedClient?.hora_saida ?? ""}</p>
            </InfoReservation>
        </GridItems>
    </>
}

export default InformacoesReserva