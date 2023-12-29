import styled from "styled-components";

export const Div = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    box-sizing: border-box;
`

export const RegisterArea = styled.div`
    background-color: #fff;
    height: 81vh;
    width: 100%;
    border-radius: 1rem;
    padding: 1rem;
    overflow-y: scroll;

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

export const FormArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
`

export const Item = styled.div`
    background-color: #f4f4f4;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`

export const Text = styled.p`
    max-width: 80px;
    color: ${props => props.textcolor};
    font-size: 16px;
`

export const Icon = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.buttoncolor};
    border-radius: .5rem;
    border: none;

    &:hover {
        cursor: pointer;
        transition: 500ms all;
        opacity: 0.9;
    }

    &:active {
        opacity: 0.7;
    }
`

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    
    gap: 1rem;
    height: 100%;
`

export const FormButton = styled.div`
    background-color: ${props => props.background};
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 3rem;
    border-radius: 1rem;
`

export const FormItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
`

export const TextItem = styled.p`
    color: ${props => props.textcolor};
    font-size: 21px;
    max-width: 128px;
`

export const DivImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
`

export const GroupButton = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 2.8rem;
    justify-content: space-between;
    gap: 1rem;
`