import styled from "styled-components"
import { theme } from "../../theme/theme"

const { neutralColor } = theme

export const Container = styled.div`
    margin: 4rem 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
`

export const Text = styled.p`
    font-size: 18px;
    color: ${neutralColor};
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