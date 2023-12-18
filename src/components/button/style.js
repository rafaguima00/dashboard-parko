import styled from "styled-components";

export const Button = styled.button`
    background-color: ${props => props.background};
    color: ${props => props.textcolor ? props.textcolor : "#fff"};
    border-radius: 6px;
    border: ${props => props.btborder ? props.btborder : "none"};
    height: ${props => props.altura ? props.altura : "auto"};
    width: ${props => props.largura ? props.largura : "auto"};
    font-weight: ${props => props.bold === true ? 700 : 400};

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.7;
    }
`