const toRadians = (degree) => degree * (Math.PI / 180);

const toDegree = (radians) => radians * (180 / Math.PI);


const roundNumber = (number) => number.toFixed(5)

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