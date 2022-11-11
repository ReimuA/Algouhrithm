function fibonnaci(n: number): number {
    if (n <= 1) return n;

    let a = 0;
    let b = 1;
    let result = 1;

    for (let i = 1; i < n; i++) {
        result = a + b;
        a = b;
        b = result;
    }

    return result;
}

const demo = () => {
    console.log("Fibonnaci with dynamic programming\n");

    [...Array(10).keys()].forEach(e => {
        console.log(`Fibonnaci(${e}) = ${fibonnaci(e)}`)
    })
}

export default demo;