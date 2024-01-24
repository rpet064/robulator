const math = require('mathjs');

const parser = new math.Parser();

const solvePiEquation = (equation: string): string => {
    let equationReplacedPi = replacePiSymbol(equation);
    return parser.evaluate(equationReplacedPi);
}

function replacePiSymbol(equation: string) {
    return equation.replace(/𝝅/g, 'pi');
}

export default solvePiEquation;