import styled from "styled-components"
import { theme } from "../../theme/theme"

const { neutralColor, primaryColor, cancelColor } = theme

export const Container = styled.div`
    margin: 4rem 5.11rem 0 0;
    display: grid;
    grid-template-rows: 4% 37% 4% 37% 5%;
    grid-template-columns: 68% 31%;
    gap: 1rem;
    align-items: flex-start;
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr) 22vw;
    grid-column: span 2;

    &:last-child {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
`

export const ItemReservation = styled.div`
    display: grid;
    grid-template-columns: 1fr 22vw;
    grid-column: span 2;
    column-gap: 1rem;
`

export const CloseReserve = styled.div`
    column-gap: 1rem;
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    
`

export const TopItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    grid-column: 1;
    width: 100%;
`

export const TopTwo = styled.div`
    grid-column: 1;
    display: flex;
    align-items: flex-start;
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
    grid-column: 1;
    border-radius: 20px;
    padding: ${props => props.padding ? props.padding : "1rem"};
    overflow-y: auto;
    box-sizing: border-box;

    &:last-child {
        grid-column: span 3;
        display: flex;
        flex-direction: row;
        gap: 10rem;
    }

    &::-webkit-scrollbar {
        width: .25rem;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${neutralColor};
        border-radius: 3px;
    }
`

export const Timing = styled.div`
    background-color: ${props => props.background};
    grid-row: 2;
    grid-column: 2;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .75rem;
    color: #fff;
    height: 100%;
`

export const View = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Clock = styled.div`
    height: 193px;
    width: 193px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
    background-color: #381B7A;

    p:last-child {
        padding-top: 4px;
        font-weight: 700;
        font-size: 26px;
    }
`

export const TitleReservation = styled.p`
    grid-column: span 3;
    font-size: 19px;
    color: ${neutralColor};
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
    overflow-y: auto;
    scrollbar-width: 0.5rem;
    scrollbar-color: #e7e7e7 #7c7c7c;
    padding-top: .5rem;

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
    background-color: ${props => props.backgroundcolor};
    color: ${props => props.textcolor};
    display: grid;
    grid-template-columns: 50px repeat(2, 120px) 60px 140px 50px;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    border: none;
    padding: 8px 0;
    height: 2.6rem;

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
    row-gap: .7rem;
    column-gap: 2.5rem;
`

export const InfoReservation = styled.div`
    color: ${neutralColor};

    strong {
        font-size: 1.1rem;
    }

    p{
        max-height: 68%;
        overflow: hidden;
        font-size: 1rem;
    }
`

export const Edit = styled.button`
    padding: .5rem 1rem;
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
    color: ${neutralColor};
    font-size: 1.1rem;
    margin-bottom: 1rem;

    strong {
        color: ${props => props.textcolor ? props.textcolor : primaryColor};
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
    align-items: flex-end;
    gap: 1rem;
    margin-top: 4px;
    margin-bottom: 1rem;
`

export const Select = styled.select`
    font-size: .8rem;
    color: #7d7d7d;
    border-radius: 10px;
    border: solid 1px #523499;
    padding: 12px;
    height: 48px;
    width: 300px;

    &:focus {
        outline: solid 1.5px #523499;
    }
`

export const Price = styled.input`
    font-size: .8rem;
    color: #7d7d7d;
    border-radius: 10px;
    border: solid 1px #523499;
    box-sizing: border-box;
    padding: 12px;
    width: 100px;
    height: 48px;
    display: flex;
    align-items: center; 
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }

    &:focus {
        outline: solid 1.5px #523499;
    }
`

export const Add = styled.button`
    background-color: #fff;
    font-size: 32px;
    color: ${neutralColor};
    padding: 4px 10px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 1.5px 1.5px ${neutralColor};
    height: 48px;
    width: 48px;

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

export const MessageError = styled.p`
    color: ${cancelColor};
`

export const DivError = styled.div`
    width: 30rem;
`

export const DivPayment = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const ArrayElement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`

export const RadioAreaStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`

export const RadioText = styled.p`
    color: ${neutralColor};
`

export const InputArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .7rem;

    div {
        display: flex;
        flex-direction: row;
        gap: .4rem;
    }
`

export const Label = styled.label`
    color: ${props => props.textcolor ? props.textcolor : neutralColor};
    font-weight: ${props => props.bold ? "700" : "400"};
    font-size: ${props => props.font ? props.font : 16}px;
`

export const Radio = styled.input`
    accent-color: #7d7d7d;
`