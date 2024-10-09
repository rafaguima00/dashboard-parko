import styled from "styled-components"
import { theme } from "../../theme/theme"

const { cancelColor, blueColor } = theme

export const Container = styled.div`
    margin: 4rem 5.11rem 4rem 0;
    display: grid;
    grid-template-rows: 5% auto 16% 5%;
    gap: 1rem;
`

export const Title = styled.div`
    grid-column: 1;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`

export const Icon = styled.button`
    background-color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 10px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        background-color: #f4f4f4;
    }
`

export const IconGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: .5rem;
`

export const SecondTitle = styled.div`
    grid-row: 1;
    grid-column: span 2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`

export const Summary = styled.span`
    background: #fff;
    grid-column: span 1;
    grid-row: span 2;
    padding: 1rem;
    border-radius: 20px;
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
        width: .25rem;
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

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1.5rem;

    img {
        width: 90px;
        height: 90px;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: .1rem;
    }
`

export const Pg = styled.p`
    font-size: 12px;
    color: #545454;
`

export const InfoCheckout = styled.div`
    display: flex;
    flex-direction: column;
    gap: .4rem;
    padding: 1rem 0;

    h3 {
        color: #545454;
    }
`

export const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;

    p:first-child {
        color: ${props => props.textcolor};
        font-weight: 700;
    }

    p:last-child {
        color: ${props => props.pricetxtcolor};
    }
`

export const List = styled.span`
    background: #fff;
    grid-column: span 2;
    padding: 1rem;
    border-radius: 20px;
    overflow-y: scroll;
    max-height: 527px;

    &::-webkit-scrollbar {
        width: .25rem;
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

export const ListHeader = styled.div`
    display: grid;
    grid-template-columns: 50px repeat(2, 120px) 60px 140px 50px auto;
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
    padding-top: 6px;
`

export const ElementList = styled.button`
    background-color: ${props => props.backgroundcolor};
    color: ${props => props.textcolor};
    display: grid;
    grid-template-columns: 50px repeat(2, 120px) 60px 140px 50px auto;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    border: none;
    padding: 8px 0;
    height: 2.3rem;
    overflow: hidden;
    font-family: 'Roboto Flex', sans-serif;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const DebtClient = styled.div`
    background-color: ${cancelColor};
    color: #fff;
    height: 2.3rem;
    display: grid;
    grid-template-columns: 104px 200px 200px 121px auto;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    border: none;
    overflow: hidden;
    font-family: 'Roboto Flex', sans-serif;
    font-size: 14px;
`

export const CreditClient = styled.div`
    background-color: ${blueColor};
    color: #fff;
    height: 2.3rem;
    display: grid;
    grid-template-columns: 104px 200px 200px auto;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    border: none;
    overflow: hidden;
    font-family: 'Roboto Flex', sans-serif;
    font-size: 14px;
`

export const NameClient = styled.p`
    text-align: start;
`

export const DivDebt = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    cursor: default;
`

export const Receive = styled.button`
    width: 121px;
    height: 27px;
    font-family: 'Roboto Flex', sans-serif;
    border-radius: 8px;
    border: none;
    background-color: #A62727;
    color: #fff;
    
    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const Back = styled.button`
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border: none;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0 5px;

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

export const ButtonGroup = styled.div`
    grid-column: 1;
    grid-row: 4;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
`

export const Button = styled.button`
    width: 7rem;
    background: ${props => props.buttonColor ? props.buttonColor : "#523499"};
    color: #fff;
    border: none;
    border-radius: 10px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.8;
    }
`

export const Graphics = styled.div`
    grid-row: span 2;
    grid-column: span 2;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 1.25rem;
    
    div {
        background-color: #fff;
        width: 100%;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    div:last-child {
        background-color: ${props => props.background};
        color: #fff;
    }
`

export const InputSearch = styled.input`
    background-color: #eee;
    border: 1px solid ${props => props.inputcolor};
    border-radius: 6px;
    padding: 8px;

    &:focus {
        outline: 1px solid ${props => props.inputcolor};
    }
`

export const DivInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: .4rem;
    width: ${props => props.largura};
`

export const Label = styled.label`
    color: ${props => props.textcolor};
    font-size: 14px;
`

export const Input = styled.input`
    padding: .5rem;
    background: none;
    border: 1px solid ${props => props.bordercolor};
    border-radius: .5rem;
    width: ${props => props.largura};
    height: 2.5rem;

    &::placeholder {
        color: #7d7d7d;
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: #c4c4c4;
    }
`

export const Line = styled.p`
    text-align: center;
    color: ${props => props.textcolor};
`