import { trigSymbolsArray } from "../utility/symbolsArray"
import { splitStringByBrackers } from "../utility/splitStringByBrackers"
import { round } from "mathjs"
import {solvePiEquation } from "./solvePiEquation"

export const solveTrigCalculation = (inputToSolve: string) => {

    let containingTrigSymbol = getContainingTrigSymbol(inputToSolve)
    let trigFunction = getTrigFunction(containingTrigSymbol)

    // Cannot solve equation if these are null
    if(!trigFunction || !containingTrigSymbol){
        return "0"
    }

    try{
        // check if start of equation contains coefficent
        let doesInputContainCoefficent = !startsWithTrigSymbol(inputToSolve)

        let coefficent = 1
        let degrees = 0
        let secondPartOfEquation = ""
        
        if(doesInputContainCoefficent){

            coefficent = parseInt(inputToSolve.split(containingTrigSymbol)[0])
            secondPartOfEquation = inputToSolve.split(containingTrigSymbol)[1].slice(1, -1)

            if(secondPartOfEquation.includes("𝝅")){
                secondPartOfEquation = solvePiEquation(secondPartOfEquation)
            }
            degrees = parseInt(secondPartOfEquation)

        } else {
            secondPartOfEquation = inputToSolve.slice(4, -1)

            if(secondPartOfEquation.includes("𝝅")){
                secondPartOfEquation = solvePiEquation(secondPartOfEquation)
            }
            degrees = parseInt(secondPartOfEquation)
        }

        // Change to radians
        let argument = degreesToRadians(degrees)

        // Solve argument
        let trigValue = trigFunction(argument)
        let answer = (coefficent * trigValue)
        return round(answer, 5).toString()
    } catch (e) {
        throw new Error(`Cannot solve trig calculation ${e}`)
    }
}

export const manageTrigInput = (userInput: string, currentInput: string) => {
    try{
        let joinedInput = currentInput
        let splitString = splitStringByBrackers(joinedInput)
        
        // append "" or existing number between brackets
        splitString[2] += userInput

        return splitString.join("")

        } catch (e) {
        throw new Error(`This equation doesn"t contain brackets ${e}`)
    }
}

export const removeTrigCalculation = (input: string, inputContainTrigCalculation: string) => {
    let inputString = input
    let splitString = inputString.split(inputContainTrigCalculation)
    return splitString[0].trim()
}

const degreesToRadians  = (degrees: number) => {
    return degrees * (Math.PI / 180);
}

export const checkContainsTrigSymbol = (str: string): boolean => {
    for (const symbol of trigSymbolsArray) {
        if (str.includes(symbol)) {
            return true
        }
    }
    return false
}

const getContainingTrigSymbol = (str: string): string | null => {
    for (const symbol of trigSymbolsArray) {
        if (str.includes(symbol)) {
            return symbol
        }
    }
    return null
}

const getTrigFunction = (symbol: string | null): ((x: number) => number) | null => {
    if (symbol === null) return null;

    switch (symbol) {
        case "sin":
            return Math.sin;
        case "cos":
            return Math.cos;
        case "tan":
            return Math.tan;
        case "log":
            return Math.log;
        default:
            return null;
    }
}

const startsWithTrigSymbol = (input: string) => {
    return trigSymbolsArray.some(symbol => input.startsWith(symbol));
}

