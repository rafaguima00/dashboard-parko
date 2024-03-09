import styled from "styled-components";

export const Container = styled.div`
    background-color: #f4f4f4;
    display: grid;
    grid-template-columns: 20vw auto;
    grid-template-rows: 100%;
    gap: 3rem;
`

export const Notification = styled.button`
    background-color: #eee;
    position: absolute;
    right: 0;
    margin: 1.25rem;
    border: none;
    border-radius: 4px;
    padding: 6px 8px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.6;
    }
`

export const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${props => props.background};
    height: 100vh;
    width: 90%;
`

export const Image = styled.img`
    height: 2rem;
    width: 7.5rem;
    margin: 3rem auto 4rem;
    display: block;
`

export const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1rem 4rem 0;
`

export const Path = styled.button`
    color: #fff;
    font-size: 17px;
    font-weight: 400;
    background-color: transparent;
    border: none;

    &:hover {
        cursor: pointer;
    }
`

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
    gap: 6px;

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`

export const Bottom = styled.div`
    margin-left: 5rem; 
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;

    span {
        display: flex;
        flex-direction: column;
        gap: .6rem;
    }
`

export const Name = styled.p`
    font-size: 15px;
    color: #fff;
`

export const Select = styled.select`
    background-color: transparent;
    border-radius: 6px;
    border: 1px solid #fff;
    padding: .3rem;
    outline: none;
    width: 70%;
    color: #fff;

    option {
        color: #000;
    }
`

export const ImageProfile = styled.img`
    width: 45px; 
    height: 45px;
    background-color: #fff;
    padding: 6px;
    border-radius: 10px;
`

export const UserName = styled.button`
    font-size: 15px;
    color: #fff;
    background-color: transparent;
    border: none;
    margin-left: 6px;
    width: 144px;
    text-align: start;

    &:hover {
        cursor: pointer;
    }
`

export const Logout = styled.button`
    background-color: #381B7A;
    color: #fff;
    margin: 6px;
    border: none;
    border-radius: 6px;
    padding: 6px; 

    &:hover {
        cursor: pointer;
    }
`