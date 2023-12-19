import styled from "styled-components";

export const Table = styled.table`
    margin: 3rem 0 0;
    width: 591px;

    tr {
        height: 3rem;
    }

    th:first-child {
        width: 25%;
        text-align: center;
    }

    th:last-child {
        width: 25%;
        text-align: center;
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