function isPalindrom(s: string) {
    let len = Math.floor(s.length / 2);
    for (let i = 0; i < len; i++)
        if (s[i] !== s[s.length - i - 1])
            return false;
    return true;
}

function palindromPartitioning(s: string): string[][] {
    const res: string[][] = []
    const parts: string[] = []

    const partition = (i: number) => {
        if (!(i < s.length)) {
            res.push([...parts]);
            return;
        }

        for (let j = i; j < s.length; j++) {
            let substring = s.substring(i, j + 1);

            if (isPalindrom(substring)) {
                parts.push(substring)
                partition(j + 1);
                parts.pop();
            }
        }
    };

    partition(0);
    return res;
}

const demo = () => {
    let value = "aabb"
    let result = palindromPartitioning("aabb")

    console.log(`Palindrom partioning of ${value} :\n`)
    for (const l of result) console.log(l)
}

export default demo;
