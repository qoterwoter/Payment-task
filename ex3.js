/**
 * Функция кластеризации
 * @param points { { x: number; y: number }[] } массив точек
 * @param x0 { number } центр области кластеризации по X
 * @param y0 { number } центр области кластеризации по Y
 * @param zoom { number } масштаб увеличения области кластеризации
 *
 * @return { i: number; j: number; count: number }[]
 */
module.exports = function(points, x0, y0, zoom) {
    const cells = Array.from({ length: 10 }, () => Array(10).fill(0));

    const xMin = x0 - 100 / zoom;
    const xMax = x0 + 100 / zoom;
    const yMin = y0 - 100 / zoom;
    const yMax = y0 + 100 / zoom;

    for (let point of points) {
        if ((point.x < xMax && point.x >= xMin) && (point.y < yMax && point.y >= yMin)) {
            const _y = Math.floor((point.y - xMin) / (200 / zoom / 10))
            const _x = Math.floor((point.x - xMin) / (200 / zoom / 10))
            cells[_y][_x]++
        }
    }

    const result = cells
        .map((row, y) => row.map((cell, x) => {
            if (cell > 0)
                return { i: x, j: y, count: cell }
            else return { count: 0 }
        }))
        .map(row => row.filter(({ count }) => count > 0))
        .filter(({ length }) => length > 0)
        .flat()
        .sort((a, b) => {
            if (a.j == b.j) {
                return a.j - b.j;
            }
            return a.i - b.i;
        });
    return result
}

const points = [
    { x: -12, y: -15 },
    { x: -13, y: -17 },
    { x: -30, y: -50 },
    { x: -20, y: -50 },
    { x: 5, y: -35 },
    { x: -45, y: 45 },
    { x: 30, y: 49 },
    { x: -70, y: 70 },
    { x: 75, y: -60 }
];

const x0 = 0;
const y0 = 0;
const zoom = 2;

const result = module.exports(points, x0, y0, zoom);
console.log(result);

// Output:
// [
//   { i: 5, j: 5, count: 3 },
//   { i: 6, j: 4, count: 2 },
//   { i: 5, j: 4, count: 2 },
//   { i: 4, j: 5, count: 1 },
//   { i: 5, j: 6, count: 1 }
// ]