const operationMap = {
    '0': '',
    '1': '+',
    '2': '-'
}

const getOperationVariants = () => {
    const possibleOperationsVariants = new Set();
    const currentOperations = new Array(9).fill('');

    for (let i = 0; i < 3 ** 9; i++) {
        const operations = i.toString(3)
            .split('')
            .map(el => operationMap[el]);
        currentOperations.splice(currentOperations.length - operations.length, operations.length, ...operations);
        possibleOperationsVariants.add(currentOperations.slice());
    }

    return possibleOperationsVariants;
}

// более короткое название не придумал)
const insertPlusOrMinusInNumbersStrToGetSum = (sum) => {
    const possibleOperationsVariants = getOperationVariants();
    const resultMap = {};

    possibleOperationsVariants.forEach(operations => {
        const expressionAsArr = [];

        for (let i = 9; i > 0; i--) {
            expressionAsArr.push(`${i}${operations[9 - i]}`)
        }
        expressionAsArr.push(0)
        const expression = expressionAsArr.join('');
        const result = eval(expression);

        if (!resultMap[result]) {
            resultMap[result] = []
        }
        resultMap[result].push(expression);
    })

    if (!resultMap[sum]) {
        return `Не нашлось ни одного варианта`;
    }
    return resultMap[sum].join(',\n')
}

console.log(insertPlusOrMinusInNumbersStrToGetSum(200))
