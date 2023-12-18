import styled from "styled-components";

export const ContainerForm = styled.div`
    padding-top: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
`

export const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 1021px;
    position: relative;
`

export const Icon = styled.button`
    background: none;
    border: none;
    position: absolute;
    left: 0;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`

export const Text = styled.p`
    color: ${props => props.textcolor};
    font-size: 1.2rem;
`

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 1rem;
    justify-content: space-between;
    align-items: stretch;
    width: 64rem;
    height: 30rem;
`

export const DivInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: .4rem;
`

export const Label = styled.label`
    color: ${props => props.textcolor};
    font-size: 14px;
`

export const Input = styled.input`
    padding: .5rem;
    background: none;
    border: 1px solid ${props => props.bordercolor};
    border-radius: .5rem;
    width: ${props => props.largura}px;
    height: 2.5rem;

    &::placeholder {
        color: #7d7d7d;
    }

    &:focus {
        outline: none;
    }
`

export const DivButton = styled.div`
    width: 64rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
    margin-top: ${props => props.marg ? props.marg : 0};
`

export const FormItem = styled.form`
    width: 605px;
    height: 500px;
    display: flex;
    flex-direction: column;
`

export const Span = styled.span`
    display: block;
    margin: 0 auto;
`

export const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 7rem);
    margin: 1rem 0 .7rem;
`

export const Item = styled.p`
    grid-column: ${props => props.gridcolumn};
    width: 5rem;
    font-size: 15px;
    color: ${props => props.textcolor};
    display: flex;
    justify-self: ${props => props.justify === true ? "center" : "normal"};
`

export const Table = styled.div`
    display: flex;
    flex-direction: column;
    gap: .7rem;
    margin: 1.5rem 0;
`

export const Div = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 7rem);
`

export const WeekDay = styled.p`
    color: ${props => props.textcolor};
    font-weight: 700;
`

export const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    display: flex;
    justify-self: center;
`

export const Time = styled.input`
    width: 5.6rem;
    height: 1.8rem;
    background: none;
    border-radius: .5rem;
    border: 1px solid ${props => props.bordercolor ? props.bordercolor : "#000"};
    outline-color: #523499;
    padding-left: .5rem;
`

export const DateStyle = styled.input`
    width: 7rem;
    height: 1.8rem;
    background: none;
    border-radius: .5rem;
    border: 1px solid ${props => props.bordercolor ? props.bordercolor : "#000"};
    outline-color: #523499;
    padding-left: .5rem;
`

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
    gap: .8rem;
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid ${props => props.bordercolor};
    color: #fff;
    padding: 1rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        border-bottom: none;
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