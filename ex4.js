module.exports = (timesheet, hourRate) => {
    const getHour = date => date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600

    const getPay = (start, end) => ({ min, max, rate }) => {
        let workedHours = end - start
        let payAtTime = 0
        if (start >= min && start < max) {
            if (end <= max && end > start) payAtTime = workedHours * hourRate * rate
            else payAtTime = calculatePay(start, max) + calculatePay(max, end)
        }
        if ((start >= min || start < max) && max < min) {
            if (workedHours < 0) workedHours += 24
            if (end <= max) payAtTime = workedHours * hourRate * rate
            else payAtTime = calculatePay(start, max) + calculatePay(max, end)
        }
        return payAtTime
    }

    const calculatePay = (start, end) => {
        const payAtTime = getPay(start, end)
        let pay = 0
        pay += payAtTime({ min: 8, max: 18, rate: 1 })
        pay += payAtTime({ min: 18, max: 23, rate: 1.5 })
        pay += payAtTime({ min: 23, max: 8, rate: 2 })
        return pay
    }

    let payment = 0
    for (let i = 0; i < timesheet.length; i += 2) {
        const start = new Date(timesheet[i][1])
        const end = new Date(timesheet[i + 1][1])
        const startHour = getHour(start)
        const endHour = getHour(end)
        payment += calculatePay(startHour, endHour)
    }
    return payment.toFixed(2)
}

const timesheet = [
    ['login', 1676091600000], // с 5.00             3 * 10 * 2 + 8 * 10 = 140
    ['logout', 1676131200000], // до 16.00
    // [0, 1676224800000], // с 18.00               5 * 10 * 1.5 + 9 * 10 * 2 + 1 * 10 = 265
    // [1, 1676278800000], // до 9.00
    [0, 1676197800000], // с 10.30              7.5 * 10 + 0.75 * 10 * 1.5 = 86.25
    [1, 1676227500000] // до 18.45
];
const hourRate = 10;

console.log(module.exports(timesheet, hourRate))