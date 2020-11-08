const rand = (start: number, end: number) => {
    return Math.floor(Math.random() * (end - start + 1) + start);
};


const randomNumbersWithGap = (start: number, end: number, gap: number, amount: number) => {
    // sets the first element
    const retArray = [rand(start, end)];
    let temp: number;

    for (let x = 0; x < amount - 1; x++) {
        do {
            temp = rand(start, end);
        } while (Math.abs(temp - retArray[x]) <= gap);

        retArray.push(temp);
    }

    return retArray;
};

export default randomNumbersWithGap;
