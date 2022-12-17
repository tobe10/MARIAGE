const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fsPromise = require('fs').promises
const path = require('path')
const fs = require('fs')

const logEvents = async (message, fileTo) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}`
    console.log(logItem)
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) fs.mkdirpath.join(__dirname, '..', 'logs')
        await fsPromise.appendFile(path.join(__dirname, 'logs', '..', fileTo), `${logItem}\n`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = logEvents