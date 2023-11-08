import styled from "styled-components";

export const Container = styled.div`
    background-color: #f4f4f4;
    display: grid;
    grid-template-columns: 20vw auto;
    grid-template-rows: 100%;
    gap: 3rem;
`

export const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #523499;
    height: 100vh;
`

export const Image = styled.img`
    height: 34px;
    width: 120px;
    margin: 48px 0 64px;
`

export const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding-left: 4rem;
`

export const Path = styled.button`
    color: #fff;
    font-size: 17px;
    font-weight: 500;
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
    margin-left: 48px; 
    margin-bottom: 48px;
    position: absolute; 
    bottom: 0;
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