import styled from "styled-components";

export const Text = styled.p`
    color: ${props => props.textcolor ? props.textcolor : "#545454"};
    font-size: ${props => props.fontsize ? props.fontsize : 16}px;
`