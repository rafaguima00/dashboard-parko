import styled from "styled-components";

export const Container = styled.div`
    margin: 2rem 2.5rem 2rem 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 3% 1fr 3% 1fr;
    gap: 1rem;
`

export const ContentInfo = styled.div`
    background: #fff;
    grid-column: ${props => props.gridColumn};;
    grid-row: ${props => props.gridRow};
    border-radius: 1rem;
    padding: 1rem;
    position: relative;
`

export const Title = styled.p`
    font-size: 19px;
    color: #545454;
    background-color: ${props => props.background};
    grid-column: ${props => props.gridColumn};
    grid-row: ${props => props.gridRow};
`

export const ButtonEdit = styled.button`
    position: absolute;
    background: none;
    border: none;
    right: 0;
    top: 0;
    margin: 1.3rem;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const Image = styled.img`
    width: 80%;
    height: 60%;
    border-radius: 1.5rem;
`

export const MenuEstablishment = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    padding: 1rem 0;
`

export const InfoEstablishment = styled.div`
    width: 80%;
    margin-top: 2.5rem;
`

export const TextArea = styled.div`
    color: ${props => props.textColor};
    display: flex;
    flex-direction: column;
    gap: .4rem;
    margin-bottom: .7rem;

    &:last-child {
        margin-bottom: 0;
    }
`

export const P = styled.p`
    font-size: 14px;
`

export const Name = styled.p`
    font-size: 17px;
    font-weight: 700;
`

export const Menu = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 1.3rem;

    hr {
        width: 60%;
    }
`

export const Warning = styled.p`
    color: ${props => props.textColor};
    font-size: 15px;
`

export const Hour = styled.p`
    font-weight: 700;
    color: ${props => props.textColor};
    font-size: 3.2rem;
    display: inline-block;

    p {
        font-size: 1.7rem;
    }
`

export const Section = styled.section`
    padding: 1.6rem;
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
`

export const ImageProfile = styled.img`
    width: 45px; 
    height: 45px;
    border-radius: 10px;
`

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;

    span {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
`

export const EditProfile = styled.button`
    background: none;
    border: none;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const InfoUser = styled.div`
    p {
        color: ${props => props.textcolor};
    }
`