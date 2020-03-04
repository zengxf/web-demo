function dateYmd(date) {
    return date ? date.toISOString().substr(0, 10) : ''
}

module.exports.dateYmd = dateYmd