import { notEqual } from 'assert';

function canPlaceQueen(x: number, y: number, queens: { x: number; y: number }[]) {
    if (queens.length == 0) return true;

    const res = !queens.some((q) => {
        if (x == q.x || y == q.y) return true;

        const dcol = x - q.x;
        const drow = y - q.y;

        if (dcol == drow || dcol == -drow) return true;

        return false;
    });

    return res;
}

function nqueen(n: number): number {
    let res = 0;
    const queensPos: { x: number; y: number }[] = [];
    const grid = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

    const placeQueen = (i: number) => {
        if (i == n) {
            res++;
            return;
        }

        for (let j = 0; j < n; j++) {
            if (canPlaceQueen(j, i, queensPos)) {
                grid[i][j] = 1;
                queensPos.push({ x: j, y: i });
                placeQueen(i + 1);
                grid[i][j] = 0;
                queensPos.pop();
            }
        }
    };

    placeQueen(0);
    return res;
}

const demo = () => {
    console.log('nqueen with 8: ' + nqueen(8));
};

export default demo;
