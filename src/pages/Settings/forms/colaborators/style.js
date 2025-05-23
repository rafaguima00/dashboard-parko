import styled from "styled-components"
import { theme } from "../../../../theme/theme"

const { neutralColor } = theme

export const ContentView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 1138px;
    height: 604px;
    gap: 3rem;
`

export const ColaboratorsView = styled.div`
    background-color: ${props => props.background};
    height: 100%;
    width: 20rem;
    border-radius: 1rem;
    padding: 3rem 3rem 2rem;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

export const ColaboratorsList = styled.div`
    max-height: 78%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: .5rem;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${neutralColor};
        border-radius: 3px;
    }
`

export const P = styled.p`
    font-size: 14px;
`

export const Name = styled.p`
    font-size: 17px;
    font-weight: 700;
`

export const ImageProfile = styled.img`
    width: 45px; 
    height: 45px;
    border-radius: 10px;
`

export const Profile = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: .8rem;
    width: 100%;
    background: ${props => props.background};
    border: none;
    border-bottom: 1px solid ${props => props.bordercolor};
    border-radius: 1rem;
    color: #fff;
    padding: 1rem;
    margin-bottom: 1rem;

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const InfoUser = styled.div`
    text-align: start;
    p {
        color: ${props => props.textcolor};
    }
`

export const GroupButton = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
`

export const DivImage = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 148px;
    height: 138px;
`

export const Edit = styled.button`
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
    background-color: ${props => props.background};
    border: none;
    border-radius: 50%;
    position: absolute;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const Image = styled.img`
    width: 100%;
    height: 100%;
`

export const FormContent = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    gap: .8rem;
    width: 688px;
    height: 456px;
`

export const MessageError = styled.p`
    font-size: 12px;
    color: ${props => props.textcolor};
`