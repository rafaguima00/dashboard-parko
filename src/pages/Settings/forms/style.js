import styled from "styled-components";

export const ContainerForm = styled.div`
    padding-top: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
`

export const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 1021px;
    position: relative;
`

export const Icon = styled.button`
    background: none;
    border: none;
    position: absolute;
    left: 0;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const Text = styled.p`
    color: ${props => props.textcolor};
    font-size: 19px;
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

export const InputNumber = styled.input`
    padding: .5rem;
    background: none;
    border: 1px solid ${props => props.bordercolor};
    border-radius: .5rem;
    width: ${props => props.largura}px;
    height: 2.5rem;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }

    &:focus {
        outline: none;
    }
`

export const DivButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
    margin-top: ${props => props.marg ? props.marg : 0};
`

export const Select = styled.select`
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