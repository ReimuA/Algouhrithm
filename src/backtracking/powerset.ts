// Assuming list does not contain duplicate
function powerset(list: number[]): number[][] {
    const results: number[][] = [];
    const subset: number[] = [];

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

const demo = () => {
    const set = [1, 2, 3, 4];
    const res = powerset([1, 2, 3, 4]);

    console.log(`Powerset of ${set}`);
    for (const l of res) console.log(l);
};

export default demo;
