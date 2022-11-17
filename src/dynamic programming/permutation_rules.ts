function permutationsWithRules(n: number): number {
    if (n == 0) return 0;

    let count = {
        a: 1,
        e: 1,
        i: 1,
        o: 1,
        u: 1
    };

    for (let i = 1; i < n; i++) {
        count = {
            a: count.u + count.e + count.i,
            e: count.a + count.i,
            i: count.e + count.o,
            o: count.i,
            u: count.i + count.o
        };
    }
    return count.a + count.e + count.i + count.o + count.u;
}

const demo = () => {
    console.log('Permutation of 5 vowels with rules using dynamic programming\n');

    [...Array(10).keys()].forEach((e) => {
        console.log(`permutationsWithRules(${e}) = ${permutationsWithRules(e)}`);
    });
};

export default demo;
