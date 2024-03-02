import { roundNumber } from '../utility/roundEquation'

const math = require('mathjs')
const parser = new math.Parser()

const solvePiEquation = (equation: string): string => {
    let equationReplacedPi = replacePiSymbol(equation, 'pi')
    return roundNumber(parser.evaluate(equationReplacedPi), 5)
}

function replacePiSymbol(equation: string, replacementString: string) {
    return equation.replace(/𝝅/g, replacementString)
}

export { solvePiEquation, replacePiSymbol }