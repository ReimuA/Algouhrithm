function permutation(list: number[]): number[][] {
    if (list.length == 1) return [[list[0]]];

    let result: number[][] = [];

    const lenght = list.length;
    for (let i = 0; i < lenght; i++) {
        const current = list.shift();

        // Should never happen
        if (!current) break;

        const perm = permutation(list);

        for (let j = 0; j < perm.length; j++) perm[j].push(current);

        list.push(current);
        result = [...result, ...perm];
    }

    return result;
}

const demo = () => {
    const set = [1, 2, 3, 4];
    const res = permutation([1, 2, 3, 4]);

    console.log(`Permutation of ${set}`);
    for (const l of res) console.log(l);
};

export default demo;
