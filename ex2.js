module.exports = function(originalFunction, timeInterval, maxRequests) {
    const banned = new Set()
    const requests = new Map()

    return function(ip, userTimeInterval, ...argsForOriginal) {
        if (banned.has(ip)) return

        let requestAtIp = requests.get(ip)
        if (!requestAtIp) {
            requestAtIp = []
            requests.set(ip, requestAtIp)
        }

        const interval = Math.abs(timeInterval - userTimeInterval)
        while (requestAtIp.length > 0 && requestAtIp[0] < interval) {
            requestAtIp.shift()
        }

        if (requestAtIp.length >= maxRequests) {
            banned.add(ip)
            return
        }

        requestAtIp.push(interval)
        originalFunction(...argsForOriginal)
    }
}

function sendSMS(phoneNumber, message) {
    // код отправки SMS
    console.log(`Отправлено SMS "${message}"`)
}

const protectedFunction = module.exports(sendSMS, 10, 2)

protectedFunction('128.0.0.1', 0, '+7 000 000 00-00', 'Первое сообщение')
    // console.log('Отправлено SMS "Первое сообщение"')

protectedFunction('128.0.0.1', 10, '+7 000 000 00-00', 'Второе сообщение')
    // console.log('Отправлено SMS "Второе сообщение"')

protectedFunction('128.0.0.1', 19, '+7 000 000 00-00', 'Третье сообщение')
    // ничего не произошло, IP 128.0.0.1 отправился в бан


protectedFunction('192.168.0.1', 20, '+7 000 000 00-00', 'Вызов 1 со второго IP')
    // console.log('Отправлено SMS "Вызов 1 со второго ip"')

protectedFunction('192.168.0.1', 30, '+7 000 000 00-00', 'Вызов 2 со второго IP')
    // console.log('Отправлено SMS "Вызов 2 со второго IP"')
    // IP не отправился в бан, потому что было сделано ровно 2 вызова в течение 10 секунд

protectedFunction('192.168.0.1', 40, '+7 000 000 00-00', 'Вызов 3 со второго IP');
// console.log('Отправлено SMS "Вызов 3 со второго IP"')