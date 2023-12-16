import styled from "styled-components";

export const Container = styled.div`
    margin: 2rem 4rem 2rem 0;
    display: grid;
    grid-template-columns: 368px repeat(2, auto);
    grid-template-rows: 2.5rem auto 8rem 2.5rem;
    gap: 1rem;
`

export const Title = styled.p`
    font-size: 19px;
    color: #545454;
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

export const SecondTitle = styled.p`
    font-size: 19px;
    color: #545454;
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
    border-radius: 1rem;
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
    padding-bottom: 1rem;

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
    gap: .3rem;
    padding: 12px 0;

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
        color: ${props => props.textColor};
        font-weight: 700;
    }

    p:last-child {
        color: ${props => props.priceTextColor};
    }
`

export const List = styled.span`
    background: #fff;
    grid-column: span 2;
    padding: 1rem;
    border-radius: 1rem;
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
    background-color: #f4f4f4;
    display: grid;
    grid-template-columns: 50px repeat(2, 120px) 60px 140px 50px auto;
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
    color: #7c7c7c;
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
        border-radius: 18px;
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
    border: 1px solid ${props => props.inputColor};
    border-radius: 6px;
    padding: 8px;

    &:focus {
        outline: 1px solid ${props => props.inputColor};
    }
`