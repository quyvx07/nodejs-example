const { transports, createLogger, format } = require('winston');
require('winston-daily-rotate-file');

class MyLogger {
    constructor() {
        const formatPrint = format.printf(
            ({level, message, context, requestId, timestamp, metadata}) => {
                return `${timestamp}::${level}::${context}::${requestId}::${message}::${JSON.stringify(metadata)}`
            }
        )

        this.logger = createLogger({
            format: format.combine(format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS A'
            }), formatPrint),
            transports: [
                new transports.Console(),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    level: 'info',
                    filename: 'application-%DATE%.info.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '1m',
                    maxFiles: '14d',
                    format: format.combine(format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss.SSS A'
                    }), formatPrint)
                }),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    level: 'error',
                    filename: 'application-%DATE%.error.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '1m',
                    maxFiles: '14d',
                    format: format.combine(format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss.SSS A'
                    }), formatPrint)
                }),
            ]
        })
    }

    commonParams(params) {
        let context, req, metadata;
        if (!Array.isArray(params)) {
            context = params;
        } else {
            [context, req, metadata] = params;
        }
        const requestId = req.headers['x-request-id'] || req.headers['X-Request-ID'] || req?.requestId || 'unknown';
        return { context, requestId, metadata };
    }

    log(message, params) {
        const paramLog = this.commonParams(params)
        const logObj = Object.assign({ message }, paramLog)
        this.logger.info(logObj)
    }

    error(message, params) {
        const paramLog = this.commonParams(params)
        const logObj = Object.assign({ message }, paramLog)
        this.logger.error(logObj)
    }
}

module.exports = new MyLogger();