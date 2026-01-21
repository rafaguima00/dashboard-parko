import styled from "styled-components";

export const Table = styled.div`
    width: 100%;
    border-collapse: collapse;
    overflow-y: scroll;
    max-height: 15rem;
    padding: 0 1rem;

    tr {
        height: 2.7rem;
        gap: 20rem
    }
`

export const Head = styled.thead`
    width: ${props => props.largura ? props.largura : `auto`};

    th {
        color: ${props => props.textcolor};
    }
`

export const Th = styled.th`
    width: auto;
    color: #bababa;
    font-weight: 400;
    border-bottom: 1px solid #eaeaea;
    padding: 0 1.5rem;
`

export const Td = styled.td`
    color: ${props => props.textcolor};
    text-align: center;
    border-bottom: 1px solid #eaeaea;
`

export const ItemTable = styled.td`
    color: #7c7c7c;
    text-align: center;
    border-bottom: 1px solid #eaeaea;
    padding: 8px 16px;
`

export const AllTable = styled.div`
    overflow-y: scroll;
    max-height: 15rem;
    width: 100%;
    font-size: 13px;
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