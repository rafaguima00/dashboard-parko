import styled from "styled-components";

export const Container = styled.div`
    margin: 2rem 2.5rem 2rem 0;
    display: grid;
    grid-template-rows: 45% 45% 10%;
`

export const Content = styled.div`
    display: grid;
    grid-template-rows: 40px 15rem;
    grid-template-columns: repeat(2, 1fr) 22vw;
    column-gap: 1rem;

    &:first-child {
        margin-bottom: 12rem;
    }

    &:last-child {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
`

export const ItemReservation = styled.div`
    display: grid;
    grid-template-rows: 2.5rem 17rem;
    grid-template-columns: repeat(2, 1fr) 22vw;
    column-gap: 1rem;

    &:first-child {
        margin-bottom: 12rem;
    }

    &:last-child {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
`

export const CloseReserve = styled.div`
    column-gap: 1rem;

    &:first-child {
        margin-bottom: 12rem;
    }

    &:last-child {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
`

export const TopItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    grid-column: span 2;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;

`

export const InputSearch = styled.input`
    background-color: #eee;
    border: 1px solid #523499;
    border-radius: 6px;
    padding: 8px;

    &:focus {
        outline: 1px solid #523499;
    }
`

export const Icon = styled.button`
    background-color: #fff;
    border: none;
    border-radius: 4px;
    padding: 6px 8px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        background-color: #f4f4f4;
    }
`

export const ReservationList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    grid-column: span 3;
`

export const List = styled.div`
    width: 100%;
    height: 19rem;
    background-color: #fff;
    grid-row: 2;
    grid-column: span 2;
    border-radius: 20px;
    padding: 1rem;

    &:last-child {
        grid-column: span 3;
        display: flex;
        flex-direction: row;
        gap: 10rem;
    }
`

export const Timing = styled.div`
    background-color: ${props => props.background};
    grid-row: 2;
    grid-column: 3;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    color: #fff;
    height: 19rem;
`

export const View = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Clock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    p:last-child {
        padding-top: 4px;
        font-weight: 700;
        font-size: 26px;
    }
`

export const TitleReservation = styled.p`
    grid-column: span 3;
    font-size: 19px;
    color: #545454;
`

export const ListHeader = styled.div`
    display: grid;
    grid-template-columns: 50px repeat(2, 120px) 60px 140px 50px;
    justify-content: space-evenly;
    border-bottom: solid 1px #EAEAEA;
    padding-bottom: 6px;
`

export const Text = styled.p`
    color: #C4C4C4;
    font-size: 14px;
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

export const ElementList = styled.button`
    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    display: grid;
    grid-template-columns: 50px repeat(2, 120px) 60px 140px 50px;
    justify-content: space-evenly;
    border-radius: 8px;
    border: none;
    padding: 8px 0;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const ItemList = styled.p`
    font-size: 13px;
    justify-self: center;
`

export const Name = styled.p`
    color: #fff;
    border-radius: 6px;
    padding: 6px; 
    font-size: 14px;
    width: 140px;
    text-align: center;

    &:last-child {
        background-color: #381B7A;
        margin-top: 2px;
        font-size: 12px;
    }
`

export const GridItems = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 60px);
    grid-template-columns: 144px 160px;
`

export const InfoReservation = styled.div`
    color: #545454;
`

export const Edit = styled.button`
    padding: 8px 16px;
    border: solid 2px #523499;
    border-radius: 6px;
    color: #523499;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const TextOption = styled.p`
    font-weight: 700;
    color: #545454;

    strong {
        color: #523499;
    }
`

export const SecondSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Payment = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
`

export const Select = styled.select`
    font-size: 12px;
    color: #7d7d7d;
    border-radius: 6px;
    border: solid 1px #523499;
    padding: 8px 0;
    width: 240px;

    &:focus {
        outline: solid 1.5px #523499;
    }
`

export const Price = styled.span`
    font-size: 12px;
    color: #7d7d7d;
    border-radius: 6px;
    border: solid 1px #523499;
    padding: 10px 32px 10px 16px;
    box-sizing: border-box;

    &:hover {
        cursor: default;
    }
`

export const Add = styled.button`
    background-color: #fff;
    font-size: 24px;
    color: #545454;
    padding: 4px 10px;
    border: none;
    border-radius: 6px;
    box-shadow: 0 2px 2px #545454;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const Receive = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`