const logEvents = require('./logEvents')
const logger = (req, res, next) => {

    logEvents(`${req.headers.origin}\t${req.url}`, 'reqLogs.txt')
    next()
}




module.exports = logger