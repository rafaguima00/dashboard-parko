import styled from "styled-components"
import { theme } from "../../theme/theme"

const { neutralColor } = theme

export const ElementLoading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const Loading = styled.p`
    font-size: 22px;
`

export const Container = styled.div`
    margin-top: 2rem;
    margin-right: 3rem;
`

export const Welcome = styled.p`
    font-size: 19px;
    color: #545454;
`

export const Grid = styled.div`
    margin-top: 1rem;
    padding-right: 4rem;
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: 85vh;
    column-gap: 1.5rem;
`

export const ReserveStatus = styled.div`
    background-color: #fff; 
    border-radius: 18px;
    padding: 18px;
`

export const TextReservations = styled.div`
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    gap: 5px;
    padding-bottom: 1rem;
`

export const DivReservations = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    border-bottom: 1px solid #c4c4c4;
    margin-bottom: .5rem;
`

export const BtReservations = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    border-bottom-color: ${props => props.borderbottom};
    padding-bottom: .4rem;
    font-weight: 700;
    font-size: 16px;
    color: ${props => props.textcolor};
    
    &:hover {
        cursor: pointer;
    }
`

export const ListHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(5, auto);
`

export const Text = styled.p`
    color: #C4C4C4;
    font-size: 15px;
    justify-self: center;
`

export const TextState = styled.p`
    color: #C4C4C4;
    font-size: 15px;
    justify-self: center;
`

export const ListBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: .8rem;
    max-height: 40rem;
    overflow-y: auto;
    padding-top: 6px;

    &::-webkit-scrollbar {
        width: .5rem;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${neutralColor};
        border-radius: 3px;
    }
`

export const ElementList = styled.div`
    background-color: #f4f4f4;
    display: grid;
    grid-template-columns: 13rem 14rem 12rem 12rem repeat(1, auto);
    border-radius: 8px;
    padding: .5rem 0;
`

export const InputPin = styled.button`
    width: 45px;
    height: 24px;
    align-self: center;
    justify-self: center;
    background-color: #7c7c7c;
    border: none;
    color: #fff;
    font-weight: 700;
    border-radius: 6px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.8;
    }
`

export const ItemList = styled.p`
    color: #7c7c7c;
    font-size: 15px;
    align-self: center;
    justify-self: center;
`

export const State = styled.span`
    width: 15px;
    height: 15px;
    background-color: ${props => props.cor};
    align-self: center;
    justify-self: center;
    border-radius: 50%;
`

export const InfoReservation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const GroupInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`

export const ParkingInfo = styled.div`
    padding: 1.3rem;
    border-radius: 10px;
    margin-bottom: 10px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TitleLine = styled.div`
    font-size: 28px;
    font-weight: 700;
`

export const Subtitle = styled.p`
    font-size: 14px;
    color: #7d7d7d;
`

export const Info = styled.div`
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
    color: #523499;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    &:first-child {
        background-color: #523499;
        color: #fff;
    }

    &:last-child {
        margin-bottom: 0;
    }
`

export const TextAligned = styled.span`
    text-align: center;
`

export const GroupButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 16px;
`

export const AlignText = styled.div`
    margin: 2rem 0;
`

export const Line = styled.p`
    text-align: center;
    color: ${props => props.textcolor};
`

export const Message = styled.p``