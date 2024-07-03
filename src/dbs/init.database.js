const AWS = require('aws-sdk');

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        AWS.config.update({
            region: 'us-west-2',
            endpoint: 'http://localhost:8000'
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new AWS.DynamoDB.DocumentClient()
        }
        return Database.instance
    }
}

const instance = Database.getInstance();
module.exports = instance;