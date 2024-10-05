import styled from "styled-components"
import { theme } from "../../../../theme/theme"

const { neutralColor } = theme

export const FormItem = styled.form`
    width: auto;
    display: flex;
    flex-direction: column;
`

export const Span = styled.span`
    display: block;
    margin: 0 auto;
    width: 100%;
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 0 .7rem;
`

export const Item = styled.p`
    font-size: 15px;
    color: ${props => props.textcolor};
    text-align: start;
`

export const Table = styled.div`
    display: flex;
    flex-direction: column;
    gap: .7rem;
    margin: 1.5rem 0;
`

export const PriceTableOf = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 7rem);
`

export const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    width: 100%;
`

export const WeekDay = styled.p`
    color: ${props => props.textcolor};
    font-weight: 700;
`

export const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    display: flex;
    justify-self: center;
`

export const Time = styled.input`
    width: 5.6rem;
    height: 1.8rem;
    background: none;
    border-radius: .5rem;
    border: 1px solid ${props => props.bordercolor ? props.bordercolor : "#000"};
    outline-color: #523499;
    padding-left: .5rem;
`

export const DateStyle = styled.input`
    width: 7rem;
    height: 1.8rem;
    background: none;
    border-radius: .5rem;
    border: 1px solid ${props => props.bordercolor ? props.bordercolor : "#000"};
    outline-color: #523499;
    padding-left: .5rem;
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

export const DivColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;
    width: 100%;
`

export const DivRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`