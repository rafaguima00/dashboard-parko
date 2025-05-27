export const checkClientDebts = (selectedClient, debts) => {
    if (!selectedClient) return { hasDebt: false, valuesDebt: 0 }

    const findId = debts.filter(item => 
        item.id_costumer === selectedClient.id_costumer &&
        item.status === "Pendente"
    )

    if (findId.length === 0) return { hasDebt: false, valuesDebt: 0 }

    const valuesDebt = findId.map(item => item.value).reduce((acc, current) => acc + current, 0)

    return { hasDebt: true, valuesDebt }
}
