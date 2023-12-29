import styled from "styled-components";

export const GroupInput = styled.div`
    grid-column: ${props => props.gridcolumn};
    grid-row: ${props => props.row};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
`

export const List = styled.span`
    padding: 1rem;
    border-radius: 1rem;
    overflow-y: auto;
    height: 100%;
    width: 100%;

    &::-webkit-scrollbar {
        width: .25rem;
    }

    &::-webkit-scrollbar-track {
        background: #e7e7e7;
        border-radius: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
        background: #7c7c7c;
        border-radius: 0.8rem;
    }
`

export const ListHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: space-between;
    border-bottom: solid 1px #EAEAEA;
    padding: .5rem;
`

export const Text = styled.p`
    color: ${props => props.textcolor};
    font-size: ${props => props.font ? props.font : 14}px;
    width: 100%;
    display: flex;
    justify-content: center;

    &:first-child {
        justify-content: flex-start;
        margin-left: .5rem;
    }

    &:last-child {
        justify-content: flex-end;
        margin-right: .5rem;
    }
`

export const ListBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: .8rem;
    max-height: 100%;
    padding-top: 6px;
`

export const ElementList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    position: relative;
    background-color: #f4f4f4;
    padding: .5rem;
`

export const InputSearch = styled.input`
    background-color: #eee;
    border: 1px solid ${props => props.inputcolor};
    border-radius: 6px;
    padding: 8px;

    &:focus {
        outline: 1px solid ${props => props.inputcolor};
    }
`