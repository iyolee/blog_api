const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')

const logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

morgan.token('protocol', req => req.protocol.toUpperCase() || '-')

morgan.token('date', () => new Date().toLocaleString() || '-')

morgan.format(
  'combined',
  '[log] :protocol/:http-version :status :method :remote-addr :url :response-time ms [:date] :user-agent'
)
module.exports = morgan('combined', { stream: accessLogStream })
