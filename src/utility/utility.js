export const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n)

export const factorial = n => n < 0 ? 'Invalid Input!' : n < 2 ? 1 : factorial(n - 1) * n;

export const enterKeyCodeCharacter = String.fromCharCode(13);
const toRadians = (degree) => degree * (Math.PI / 180);

const toDegree = (radians) => radians * (180 / Math.PI);


const roundNumber = (number) => number.toFixed(5);
// decimals = decimals || 5;
// return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);

//the object
export const MathInDegree = {
    sin: (number) => roundNumber(Math.sin(toRadians(number))),
    cos: (number) => roundNumber(Math.cos(toRadians(number))),
    tan: (number) => roundNumber(Math.tan(toRadians(number))),
    asin: (number) => roundNumber(toDegree(Math.asin(number))),
    acos: (number) => roundNumber(toDegree(Math.acos(number))),
    atan: (number) => roundNumber(toDegree(Math.atan(number)))
};

export const removeExtraDecimals = (str) => {
    let strGetter = '';
    let firstDecimalIndex = str.indexOf('.');
    for (let i of str) {
        if (i != '.' || i != strGetter[firstDecimalIndex]) {
            strGetter += i
        }
    }
    return strGetter;
};

export const removeExtraDecimalsInArrayStr = (oldArray) => {
    let newArr = [];
    for (let el of oldArray) {
        newArr = newArr.concat(removeExtraDecimals(el))
    }
    return newArr;
}

export const splitStrByOperators = (str) => {
    return str.split(/[+|-|/|\*]/) || str;
}

export const getAllOperatorsInStr = (str) => {
    return str.match(/[+|-|/|\*]/g) || removeExtraDecimals(str);
}

export const addOperatorsToNumInArray = (numbersArray, operatorsArray) => {
    let newArr = numbersArray.map((el, i) => {
        let correspondingOperator = operatorsArray[i] != null ? operatorsArray[i] : '';
        let eachAdded = el + correspondingOperator;
        return (eachAdded);
    })
    return newArr.join('');
}

export const removeExtraDecimalsInStrings = (str) => {
    let numArr = splitStrByOperators(str);
    let operatorsInArr = getAllOperatorsInStr(str);
    let extraDecimalsCleanedArr = removeExtraDecimalsInArrayStr(numArr);
    let addedNumAndOperatorsInArr = addOperatorsToNumInArray(extraDecimalsCleanedArr, operatorsInArr);
    return addedNumAndOperatorsInArr;
}



// console.log(m.match(/[+|-|/|\*]/g))