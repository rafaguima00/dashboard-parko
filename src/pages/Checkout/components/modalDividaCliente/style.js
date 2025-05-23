import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
`

export const DivInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: .4rem;
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

export const Select = styled.select`
    font-size: 12px;
    color: #7d7d7d;
    border-radius: 6px;
    border: solid 1px #523499;
    padding: 8px 0;
    width: ${props => props.largura};
    height: 2.5rem;

    &:focus {
        outline: solid 1.5px #523499;
    }
`