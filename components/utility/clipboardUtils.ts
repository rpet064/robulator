import { successMessage } from "./toastMessages"

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  successMessage("Copied to clipboard")
}

export const copyPreviousCalculationToClipboard = (prevInput:string) => {
  copyToClipboard(prevInput)
}

export const copyCurrentCalculationToClipboard = 
(firstInput: string, operator: string, secondInput: string) => {

  let textToCopy = firstInput + operator + secondInput
  copyToClipboard(textToCopy)
}
