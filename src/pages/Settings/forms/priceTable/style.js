import styled from "styled-components"
import { theme } from "../../../../theme/theme"

const { neutralColor, primaryColor } = theme

export const Form = styled.form`
    width: auto;
    height: 502px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const Label = styled.label`
    color: ${props => props.textcolor ? props.textcolor : neutralColor};
    font-weight: ${props => props.bold ? "700" : "400"};
    font-size: ${props => props.font ? props.font : 16}px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    width: 100%;
`

export const InputArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;

    div {
        display: flex;
        flex-direction: row;
        gap: .4rem;
    }
`

export const Select = styled.select`
    width: 5rem;
    height: 1.8rem;
    background: none;
    border-radius: .5rem;
    border: 1px solid ${props => props.bordercolor ? props.bordercolor : "#000"};
    outline-color: #523499;
    color: #7d7d7d;
    padding: 6px;
`

export const InputText = styled.input`
    width: 5rem;
    height: 1.8rem;
    background: none;
    border-radius: .5rem;
    border: 1px solid ${props => props.bordercolor ? props.bordercolor : "#000"};
    outline-color: #523499;
    color: #7d7d7d;
    padding: 6px;
`

export const InputNumber = styled.input`
    padding: .5rem;
    background: none;
    border: 1px solid ${props => props.bordercolor};
    border-radius: .5rem;
    width: ${props => props.largura}px;
    height: 2rem;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }

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

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const Block = styled.div`
    display: block;
    margin: 3rem auto;
`

export const HoraFracao = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const Table = styled.div`
    width: 471px;
    color: ${neutralColor};
`

export const Header = styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: row;
    gap: .8rem;
    margin-bottom: 1rem;

    p {
        width: 120px;
        text-align: start;
    }
`

export const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
`

export const RowTable = styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: .8rem;
`

export const Square = styled.input`
    border: 1px solid ${primaryColor};
    width: 120px;
    height: 35px;
    border-radius: 10px;
    background: none;
    box-sizing: border-box;
    padding: 8px;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }
`

export const Add = styled.button`
    background-color: #fff;
    font-size: 26px;
    color: ${neutralColor};
    padding: 4px 10px;
    border: none;
    border-radius: 50%;
    box-shadow: 0 1.5px 1.5px ${neutralColor};
    height: 36px;
    width: 36px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const ColumnTable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`