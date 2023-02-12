module.exports = async function(request, showSpinner, hideSpinner) {
    const startTime = Date.now();
    const result = await request();
    const endTime = Date.now();

    if (endTime - startTime >= 250) {
        showSpinner();
        setTimeout(hideSpinner, Math.max(1000 - (endTime - startTime)));
    }
    return result;
};

const sayt = () => console.log('show')
const sayf = () => console.log('HIDE')

module.exports(() => {
    setTimeout(() => {
        return 'data'
    }, 500)
}, sayt, sayf)