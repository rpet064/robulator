export const changeSignArray = (currentInput: string): string => {
    if (currentInput[0] === "-") {
        return currentInput.slice(1)
    }
    return`-${currentInput}`
}