export const unformatCurrency = (num) => {
    return num?.replace(/[^\d]/g, "")
}