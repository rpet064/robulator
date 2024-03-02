import { notifyMessage } from "./toastMessages"

export const getPreviousCalculations = (): string[] | null => {
    let previousCalculationsInLocalStorage = localStorage.getItem('previousCalculations')
    if (previousCalculationsInLocalStorage) {
        return JSON.parse(previousCalculationsInLocalStorage)
    }
    return null
}

export const setPreviousCalculations = (calculationToSave: string): void => {
    let previousCalculationsInLocalStorage = getPreviousCalculations()

    let newPreviousCalculation: string[] = []
    if (previousCalculationsInLocalStorage) {
        newPreviousCalculation = previousCalculationsInLocalStorage
    }

    newPreviousCalculation.push(calculationToSave)
    localStorage.setItem('previousCalculations', JSON.stringify(newPreviousCalculation))
}

export const clearLocalStorage = (): void=> {
    localStorage.clear()
    notifyMessage("Calculations history has been cleared")
}