const fetchData = () => new Promise(resolve => {
    setTimeout(() => {
        resolve('Data')
    }, 350)
})

module.exports = async(request, show, hide) => {
    return new Promise((resolve, reject) => {
        const start = Date.now()
        const timeoutId = setTimeout(() => {
            show();
        }, 250);

        request()
            .then((data) => {
                clearTimeout(timeoutId);
                const end = Date.now()

                if (end - start > 250) {
                    setTimeout(() => hide(), 1000 - (end - start))
                }
                resolve(data);
            })
    });
}

const hideLoadSpinner = () => console.log('hide')

const showLoadSpinner = () => console.log('show')

module.exports(fetchData, showLoadSpinner, hideLoadSpinner)