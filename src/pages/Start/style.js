import styled from "styled-components";

export const Container = styled.div`
    margin-top: 2rem;
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

export const TextClient = styled.p`
    color: #545454;
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
    padding-bottom: .4rem;
    font-weight: 700;
    font-size: 16px;
    
    &:hover {
        cursor: pointer;
    }
`

export const ListHeader = styled.div`
    display: grid;
    grid-template-columns: 96px 156px repeat(3, 144px)
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
    max-height: 23rem;
    overflow-y: auto;
    scrollbar-width: 0.5rem;
    scrollbar-color: #e7e7e7 #7c7c7c;
    padding-top: 6px;

    &::-webkit-scrollbar {
        width: .5rem;
    }

    &::-webkit-scrollbar-track {
        background: #e7e7e7;
        border-radius: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
        background: #7c7c7c;
        border-radius: 0.8rem;
    }
`

export const ElementList = styled.div`
    background-color: #f4f4f4;
    display: grid;
    grid-template-columns: 84px 156px repeat(3, 144px);
    justify-content: center;
    border-radius: 8px;
    padding: 6px 0;
`

export const InputPin = styled.input`
    width: 45px;
    height: 24px;
    align-self: center;
    background-color: #7c7c7c;
    border: none;
    color: #fff;
    border-radius: 6px;

    &::placeholder {
        color: #fff;
        font-weight: 700;
        text-align: center;
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
    background-color: #523499;
    align-self: center;
    justify-self: center;
    border-radius: 50%;
`

export const InfoReservation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

export const Title = styled.div`
    font-size: 26px;
`

export const Subtitle = styled.p`
    font-size: 14px;
    color: #7d7d7d;
`

export const Info = styled.div`
    position: relative;
    background-color: #fff;
    padding: 1.3rem;
    border-radius: 10px;
    margin-bottom: 10px;
    text-align: center;
    color: #523499;

    &:first-child {
        background-color: #523499;
        color: #fff;
    }

    &:last-child {
        margin-bottom: 0;
    }
`

export const GroupButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 16px;
`

export const Button = styled.button`
    background-color: #523499;
    color: #fff;
    border-radius: 6px;
    border: none;
    padding: 10px 0;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.9;
    }

    &:last-child {
        background-color: #d64d4d;
    }
`