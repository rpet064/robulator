const math = require('mathjs')
const parser = new math.Parser()

export const solvePiEquation = (equation: string): string => {
    let equationReplacedPi = replacePiSymbol(equation, 'pi')
    return math.round(parser.evaluate(equationReplacedPi), 5)
}

export const replacePiSymbol = (equation: string, replacementString: string) => {
    return equation.replace(/𝝅/g, replacementString)
}