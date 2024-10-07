import styled from "styled-components";

export const Container = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
`

export const Image = styled.img`
    height: 100vh;
    width: 50vw;
    background: ${props => props.backgroundimg};
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
    font-size: 54px;
    margin: 0 25%;
    padding: 48px 0;
`

export const AreaForm = styled.form`
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
`

export const FormContent = styled.div`
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

    div {
        width: 18rem;
    }
`

export const TextField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 1rem;
    width: 18rem;
`

export const Label = styled.label`
    color: #7d7d7d;
    font-size: 12px;
    width: 18rem;
`

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 2px solid ${props => props.bordercolor ? props.bordercolor : "#7d7d7d"};
    border-radius: 10px;
`

export const MessageError = styled.p`
    font-size: 12px;
    color: #CC0000;
    margin: .5rem 0 1rem;
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
    color: ${props => props.textcolor};
    font-weight: 600;
    padding-right: 4px;
`

export const BtPassword = styled.p`
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
    height: 2.7rem;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background-color: ${props => props.btcolor};
    color: #fff;
    font-size: 15px;

    &:hover {
        cursor: pointer;
    }
`

export const Div = styled.div`
    width: 18rem;
    margin-bottom: 2rem;
    padding-right: 2rem;

    p {
        color: ${props => props.textcolor};
        font-size: 32px;
        text-align: start;
        letter-spacing: .75px;
        margin-top: 4px;
    }
`

export const Message = styled.p`
    color: #7d7d7d;
    font-size: 12px;
`

export const Back = styled.button`
    background: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
`