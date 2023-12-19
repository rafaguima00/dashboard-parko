import styled from "styled-components";
import { theme } from "../../../../theme/theme";

const { neutralColor } = theme;

export const Form = styled.div`
    width: auto;
    height: 502px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: 2px solid #000;
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

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`