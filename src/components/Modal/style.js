import styled from "styled-components";

export const Background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(204, 204, 204, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

export const Content = styled.div`
    background-color: #fff;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth};
`

export const Header = styled.div`
    background-color: ${props => props.background};
    width: 100%;
    color: #fff;
    font-size: 18px;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    padding: .8rem 0;

    p {
        text-align: center;
    }
`

export const Spacing = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;
`

export const FormArea = styled.div`
    padding: .8rem 0;
`

export const DivButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    gap: 2rem;
`