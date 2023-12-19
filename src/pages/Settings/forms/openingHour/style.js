import styled from "styled-components";

export const FormItem = styled.form`
    width: auto;
    height: 500px;
    display: flex;
    flex-direction: column;
`

export const Span = styled.span`
    display: block;
    margin: 0 auto;
`

export const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 7rem);
    margin: 1rem 0 .7rem;
`

export const Item = styled.p`
    grid-column: ${props => props.gridcolumn};
    width: 5rem;
    font-size: 15px;
    color: ${props => props.textcolor};
    display: flex;
    justify-self: ${props => props.justify === true ? "center" : "normal"};
`

export const Table = styled.div`
    display: flex;
    flex-direction: column;
    gap: .7rem;
    margin: 1.5rem 0;
`

export const Div = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 7rem);
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