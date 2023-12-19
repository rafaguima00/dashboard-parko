import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 1rem;
    justify-content: space-between;
    align-items: stretch;
    width: 64rem;
    height: 30rem;
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
    width: ${props => props.largura}px;
    height: 2.5rem;

    &::placeholder {
        color: #7d7d7d;
    }

    &:focus {
        outline: none;
    }
`

export const DivButton = styled.div`
    width: 64rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
    margin-top: ${props => props.marg ? props.marg : 0};
`