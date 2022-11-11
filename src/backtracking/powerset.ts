// Assuming list does not contain duplicate
function powerset(list: number[]): number[][] {
    let results: number[][] = [];
    let subset: number[] = [];

    const makeSubset = (i: number) => {
        if (!(i < list.length)) {
            return results.push([...subset]);
        }

        subset.push(list[i]);
        makeSubset(i + 1);

        subset.pop();
        makeSubset(i + 1);
    };

    makeSubset(0);
    return results;
}

let demo = () => {
    let set = [1, 2, 3, 4];
    let res = powerset([1, 2, 3, 4]);

    console.log(`Powerset of ${set}`);
    for (const l of res) console.log(l);
};

export default demo;
