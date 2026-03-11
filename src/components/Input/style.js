import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DivInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: .4rem;
    margin-top: 1rem;
`

export const Label = styled.label`
    color: ${props => props.textcolor};
    font-size: 14px;
    max-width: 210px;
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

    &:disabled {
        background-color: #c4c4c4;
    }
`