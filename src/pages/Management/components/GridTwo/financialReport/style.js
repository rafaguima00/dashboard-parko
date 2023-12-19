import styled from "styled-components";

export const Table = styled.table`
    margin: 1rem 0 0;
    width: 100%;

    tr {
        height: 3rem;
    }

    th {
        width: auto;
        color: #bababa;
        font-weight: 400;
        border-bottom: 1px solid #eaeaea;
        padding: 0 .5rem;
    }

    th:first-child {
        width: 25%;
        text-align: start;
    }

    th:last-child {
        width: 25%;
        text-align: end;
    }

    td {
        text-align: start;
        color: #7c7c7c;
        border-bottom: 1px solid #eaeaea;
        padding: 0 .5rem;
    }

    td:first-child {
        width: 20%;
    }

    td:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid transparent;
    }
`

export const Icon = styled.button`
    display: flex;
    justify-self: center;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4;
    padding: 8px;
    border-radius: 8px;
    border: none;
    margin-left: .5rem;

    &:hover {
        cursor: pointer;
    }

    &:active {
        opacity: 0.8;
    }
`

export const Body = styled.tbody`
    /* tr:nth-child(even) {
        background-color: #ebebeb;
    } */
`