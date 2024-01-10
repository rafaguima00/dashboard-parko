import styled from "styled-components";

export const Table = styled.table`
    width: ${props => props.largura || "37rem"};
    border-collapse: collapse;

    tr {
        height: 2.7rem;
    }
`

export const Head = styled.thead`
    th {
        color: ${props => props.textcolor};
    }
`

export const Th = styled.th`
    width: auto;
    color: #bababa;
    font-weight: 400;
    border-bottom: 1px solid #eaeaea;
    padding: 0 .5rem;
`

export const Td = styled.td`
    color: ${props => props.textcolor};
    text-align: center;
    border-bottom: 1px solid #eaeaea;
`

export const Block = styled.div`
    display: block;
    margin: auto;
`

export const Span = styled.span`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    width: 38rem;
`

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 16rem;
    gap: .6rem;

    hr {
        width: 100%;
    }

    span {
        color: #7c7c7c;
        display: flex;
        flex-direction: column;
        gap: .4rem;
    }
`

export const Month = styled.p`
    font-weight: 700;
    font-size: 16px;
`

export const GraphicElement = styled.div`
    width: ${props => props.largura}%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`