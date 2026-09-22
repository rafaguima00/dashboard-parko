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
    margin: ${props => props.margin || 0};
`

export const Label = styled.label`
    color: ${props => props.textcolor};
    font-size: 14px;
    max-width: 210px;
`

export const Input = styled.input`
    padding: .5rem;
    background: none;
    border: solid ${props => props.borderwidth ? props.borderwidth : 1}px ${props => props.bordercolor};
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