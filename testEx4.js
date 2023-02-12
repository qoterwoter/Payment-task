module.exports = function(timesheet, hourRate) {
    let pay = 0

    const setHourFromDate = (date, toHour) => {
        const time = new Date(date.getTime())
        time.setUTCHours(toHour)
        time.setUTCMinutes(0)
        time.setUTCSeconds(0)
        time.setUTCMilliseconds(0)
        return time
    }

    const getPay = (start, end) => {
        const _start = start.getUTCHours()
        const _end = end.getUTCHours()
        const workedHours = Math.abs(end - start) / 3600000 //+ (_end > _start ? 0 : 24)
        console.log(start, end, _start, _end, workedHours)
        let payAtTime = 0
        if (_start >= 8 && _start < 18) {
            if (_end <= 18) payAtTime = workedHours * hourRate
            if (_end > 18) {
                const time = setHourFromDate(start, 18)
                return getPay(start, time) + getPay(time, end)
            }
        }
        if (_start >= 18 && _start < 23) {
            console.log(true)
            if (_end <= 23 && Number.isInteger(workedHours)) payAtTime = workedHours * hourRate * 1.5
            if (_end > 23 || _end <= 18) {
                const time = setHourFromDate(start, 23)
                return getPay(start, time) + getPay(time, end)
            }
        }
        if (_start >= 23 || _start < 8) {
            if (_end <= 8) payAtTime = workedHours * hourRate * 2
            else {
                const time = setHourFromDate(end, 8)
                return getPay(start, time) + getPay(time, end)
            }
        }
        return Math.abs(payAtTime)
    }

    for (let i = 0; i < timesheet.length; i += 2) {
        const start = new Date(timesheet[i][1])
        const end = new Date(timesheet[i + 1][1])
        pay += getPay(start, end)
    }
    return +pay.toFixed(2)
}

const timesheet = [
    // ['login', 1676091600000], // С 5 УТРА ДО 4 ДНЯ
    // ['logout', 1676131200000],
    // [0, 1676138400000], // с 18 до 06
    // [1, 1676181600000],
    [0, 1676163600000],
    [1, 1676244600000]
];
const hourRate = 10;

console.log(module.exports(timesheet, hourRate))