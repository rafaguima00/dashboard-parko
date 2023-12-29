import styled from "styled-components";

export const Container = styled.div`
    margin: 4rem 4rem 4rem 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 2% repeat(2, 1fr);
    gap: 1rem;
`

export const Financial = styled.div`
    padding: 1rem;
    border-radius: 1rem;
    grid-row: ${props => props.gridrow};
    grid-column: ${props => props.gridcolumn};
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 81vh;

    &:last-child {
        background-color: transparent;
        justify-content: space-between;
        align-items: stretch;
        gap: 1rem;
        padding: 0;
    }
`

export const Button = styled.button`
    background: ${props => props.background ? props.background : "none"};
    font-size: ${props => props.font ? props.font : 18}px;
    font-weight: ${props => props.bold ? "700" : "400"};
    color: ${props => props.textcolor};
    border: 2px solid transparent;
    border-bottom-color: ${props => props.borderbottom};
    border-radius: ${props => props.borderradius};
    padding: .5rem 0;
    padding-right: ${props => props.paddingright};
    padding-left: ${props => props.paddingleft};
    gap: .6rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
    }
`

export const GroupButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: .7rem;
    width: ${props => props.largura};
    margin-right: ${props => props.marginright};

    button {
        background: ${props => props.background ? props.background : "none"};
        border-radius: .5rem;
        border: 2px solid transparent;
        padding: 4px;
    }

    button:hover {
        cursor: pointer;
    }
`

export const Span = styled.span`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Div = styled.div`
    background-color: #fff;
    height: ${props => props.height}%;
    padding: 2rem 3rem .5rem;
    border-radius: 1rem;
    position: relative;
`

export const BlockQuote = styled.button`
    display: block;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: ${props => props.bold};
    color: ${props => props.textcolor};
    border: 2px solid transparent;
    border-bottom-color: ${props => props.borderbottom};
    padding: 0 2rem;

    &:hover {
        cursor: pointer;
    }
`

export const Section = styled.span`
    margin-left: 5rem;
    display: ${props => props.display};
`

export const Icon = styled.button`
    background: none;
    margin: 2rem;
    border: none;
    position: absolute;
    right: 0;
    top: 0;

    &:hover {
        cursor: pointer;
    }
`

export const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: .5rem;
    height: 92%;
    color: #c7c7c7;
    font-size: 15px;
`