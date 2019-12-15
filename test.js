function calculateSquare(input) {
    return new Promise((resolve, reject) => {
        if(typeof input !== 'number') reject('Invalid input type!');
        resolve(input * input);
    })
}

module.exports = calculateSquare;