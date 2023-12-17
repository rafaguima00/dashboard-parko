import styled from "styled-components";

export const Container = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
`

export const Image = styled.img`
    height: 100vh;
    width: 50vw;
    background: ${props => props.backgroundImg};
`

export const WelcomeArea = styled.div`
    position: absolute;
    top: 0;
`

export const Logo = styled.img`
    height: 10%;
    width: 20%;
    margin: 3rem;
`

export const ElementText = styled.div`
    width: 50vw;
    display: flex;
    align-items: center;
    margin-top: 3rem;
`

export const Slogan = styled.p`
    color: #f4f4f4;
    font-size: 45px;
    display: block;
    margin: 0 56px 0 108px;
    padding: 48px 0;
`

export const AreaForm = styled.div`
    width: 50vw;
    height: 100vh;
    background-color: white;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 18px;    
    border-bottom-left-radius: 18px;
`

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 50%;
`

export const TextField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 1rem;
    width: 19rem;
`

export const Label = styled.label`
    color: #7d7d7d;
    font-size: 12px;
`

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 2px solid #7d7d7d;
    border-radius: 10px;
`

export const MessageError = styled.p`
    font-size: 12px;
    color: #CC0000;
`

export const NewPassword = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
`

export const TextPassword = styled.p`
    font-size: 12px;
    color: ${props => props.textColor};
    font-weight: 600;
    padding-right: 4px;
`

export const BtPassword = styled.button`
    background: none;
    border: none;
    font-size: 12px;
    color: #7d7d7d;
    text-decoration: underline;
    font-weight: 600;

    &:hover {
        cursor: pointer;
    }
`

export const Login = styled.button`
    width: 18rem;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background-color: ${props => props.buttonColor};
    color: #fff;

    &:hover {
        cursor: pointer;
    }
`