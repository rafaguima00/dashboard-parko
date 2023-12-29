import styled from "styled-components";
import { theme } from "../../../../../../theme/theme";

const { neutralColor, primaryColor } = theme;

export const ContainerForm = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem;
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: .25rem;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #e7e7e7;
        border-radius: 3px;
    }
`

export const Div = styled.div`
    padding-bottom: 1rem;
`

export const Label = styled.label`
    color: ${neutralColor};
    font-size: 14px;
    display: block;
    margin-bottom: .5rem;
`

export const InputText = styled.input`
    background-color: transparent;
    border: ${primaryColor} 1px solid;
    width: 100%;
    padding: 10px;
    border-radius: 10px;

    &:focus {
        outline: ${primaryColor} 1px solid;
    }

    &:disabled {
        background-color: #dedede;
    }

    &::placeholder {
        color: #d9d9d9;
    }
`

export const LabelRadio = styled.label`
    color: #7d7d7d;
    font-size: 14px;
    margin-right: 1rem;
    margin-left: .5rem;
`

export const DataVehicle = styled.p`
    color: ${neutralColor};
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${primaryColor};
    padding-right: 4rem;
    padding-bottom: .4rem;
    display: inline-block;
`

export const TextArea = styled.textarea`
    width: 100%;
    height: 8rem;
    padding: 1rem;
    border: 1px solid ${primaryColor};
    border-radius: 1rem;

    &:focus {
        outline: ${primaryColor} 1px solid;
    }

    &::placeholder {
        color: #d9d9d9;
    }
`