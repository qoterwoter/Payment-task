module.exports = {
    queue: [],
    _min: Infinity,
    _max: -Infinity,
    push(x) {
        this.queue.push(x)
        this._min = x < this._min ? x : this._min
        this._max = x > this._max ? x : this._max
    },
    shift() {
        if (!this.queue.length) return 0
        const shifted = this.queue.shift()
        if (this._min === shifted) {
            this._min = Math.min(...this.queue)
        }
        if (this._max === shifted) {
            this._max = Math.max(...this.queue)
        }
        return shifted
    },
    min() {
        return this._min !== Infinity ? this._min : 0
    },
    max() {
        return this._max !== -Infinity ? this._max : 0
    }
}

console.log(module.exports.shift())
console.log(module.exports.push(4))
console.log(module.exports.min())
console.log(module.exports.max())
console.log(module.exports.push(7))
console.log(module.exports.push(2))
console.log(module.exports.push(6))
console.log(module.exports.min(), 'min')
console.log(module.exports.max(), 'max')
console.log(module.exports.shift())
console.log(module.exports.min(), 'min')
console.log(module.exports.max(), 'max')