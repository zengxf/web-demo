function dateYmd(date) {
    if (typeof (date) == 'string')
        date = new Date(date)
    return date ? date.toISOString().substr(0, 10) : ''
}

module.exports.dateYmd = dateYmd