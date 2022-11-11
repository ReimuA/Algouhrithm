function permutation(list: number[]): number[][] {
    if (list.length == 1) return [[list[0]]];

    let result: number[][] = []

    let lenght = list.length
    for (let i = 0; i < lenght; i++) {
        let current = list.shift()!;
        let perm = permutation(list);

        for (let j = 0; j < perm.length; j++)
            perm[j].push(current)


        list.push(current);
        result = [...result, ...perm];
    }


    return result;
}

const demo = () => {
    let set = [1, 2, 3, 4];
    let res = permutation([1, 2, 3, 4]);

    console.log(`Permutation of ${set}`);
    for (const l of res) console.log(l);
}

export default demo;