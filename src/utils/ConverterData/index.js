export const converter = () => {
    const convert = new Date()
    const date = convert.getDate()
    const month = convert.getMonth()+1
    const year = convert.getFullYear()
    const hour = convert.getHours()
    const minute = convert.getMinutes()

    const converterHora = (hour<10 ? "0"+hour : hour) + ":" + (minute<10 ? "0"+minute : minute)
    const converterData = (year) + "-" + (month<10 ? "0"+month : month) + "-" + (date<10 ? "0"+date : date)

    return { date, month, year, hour, minute, converterData, converterHora }
}