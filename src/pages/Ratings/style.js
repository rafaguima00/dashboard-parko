import styled from "styled-components";

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

export const Title = styled.p`
    font-size: 19px;
    color: #545454;
`

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding-bottom: 1rem;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
    }

    span {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1px;
    }
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
    color: #545454;
    background-color: transparent;
    border: none;
    margin-left: 6px;
    width: 9rem;
    text-align: start;
`

export const Body = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem;
    min-height: 10rem;
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