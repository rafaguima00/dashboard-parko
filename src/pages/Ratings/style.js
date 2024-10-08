import styled from "styled-components"
import { theme } from "../../theme/theme"

const { neutralColor } = theme

export const Container = styled.div`
    margin: 10rem auto 0;
    gap: 1rem;
    width: 40%;
    height: 82.5vh;
    overflow: hidden;

    section {
        margin: .7rem 0 0;
        padding: 0 .5rem 10rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: scroll;
        height: 100%;

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
    }
`

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 6px;
    padding-bottom: 1rem;
`

export const ImageProfile = styled.img`
    width: 45px; 
    height: 45px;
    background-color: #c4c4c4;
    padding: 6px;
    border-radius: 10px;
`

export const UserName = styled.p`
    font-size: 15px;
    color: ${props => props.textcolor};
    background-color: transparent;
    border: none;
    width: 9rem;
    text-align: start;
`

export const Body = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem;
    min-height: 10rem;
    display: flex;
    flex-direction: column;
`

export const Comments = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 5rem;

    p {
        color: #7d7d7d;
        font-size: 14px;
        text-align: center;
    }
`

export const Space = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .4rem;
`

export const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: .2rem;
`

export const Note = styled.p`
    color: #7d7d7d;
    font-size: 14px;
`

export const Warning = styled.p`
    color: ${neutralColor};
    font-size: 16px;
    margin: auto;
`