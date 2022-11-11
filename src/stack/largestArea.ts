function largestArea(list: number[]): number {
    let maxArea = 0;
    const stack: { index: number; value: number }[] = [];

    const stackTop = () => (stack.length > 0 ? stack[stack.length - 1] : undefined);

    for (let i = 0; i < list.length; i++) {
        let index = i;
        let top = stackTop();
        const value = list[i];

        while (top && top.value > value) {
            const currentArea = top.value * (i - top.index);
            if (currentArea > maxArea) maxArea = currentArea;

            index = top.index;
            stack.pop();
            top = stackTop();
        }

        stack.push({ index, value });
    }

    for (const n of stack) {
        const currentArea = n.value * (list.length - n.index);

        if (currentArea > maxArea) maxArea = currentArea;
    }

    return maxArea;
}

const demo = () => {
    const histogram = [6, 2, 5, 4, 5, 1, 6];

    console.log(`Largest area in [${histogram}] is ${largestArea(histogram)}`);
};

export default demo;
