// Essa função recebe data (YYYY-MM-DD) e a hora (HH:MM:SS)
export const createdAt = (created_at) => {
    const splitDate = created_at?.split("T")

    if(splitDate[0].includes("-")) {
        const includes = splitDate[0].split("-")
        return `${includes[2]}/${includes[1]}/${includes[0]}, ${splitDate[1]}`
        
    }

    return null
}