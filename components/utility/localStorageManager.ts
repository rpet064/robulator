import { notifyMessage } from "./toastMessages"

export const getPreviousCalculations = (): string[] | null => {
    let previousCalculationsInLocalStorage = localStorage.getItem('previousCalculations')
    if (previousCalculationsInLocalStorage) {
        notifyMessage("Message coming")
        notifyMessage(JSON.parse(previousCalculationsInLocalStorage))
        return JSON.parse(previousCalculationsInLocalStorage)
    }
    notifyMessage("Nothing saved")
    return null
}

export const setPreviousCalculations = (calculationToSave: string): void => {
    let previousCalculationsInLocalStorage = getPreviousCalculations()

    let newPreviousCalculation: string[] = []
    if (previousCalculationsInLocalStorage) {
        newPreviousCalculation = previousCalculationsInLocalStorage
    }

    newPreviousCalculation.push(calculationToSave)
    localStorage.setItem('previousCalculations', JSON.stringify(newPreviousCalculation));
}

export const clearLocalStorage = (): void=> {
    localStorage.clear();
}