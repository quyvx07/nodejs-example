const dev = {
    app: {
        PORT: process.env.PORT || '3055'
    },
    db: {
        REGION: process.env.REGION || 'us-east-1',
        ENDPOINT: process.env.ENDPOINT || 'http://localhost:8000'
    }
}
const pro = {
    app: {
        PORT: process.env.PORT || '3055'
    },
    db: {
        REGION: process.env.REGION || 'us-east-1',
        ENDPOINT: process.env.ENDPOINT || 'http://localhost:8000'
    }
}

const config = {
    dev,
    pro
}

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]