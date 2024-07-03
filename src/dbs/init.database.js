const AWS = require('aws-sdk');

const config = require("../configs/config");

AWS.config.update({
    region: config.db.REGION,
    endpoint: config.db.ENDPOINT
});

module.exports = new AWS.DynamoDB.DocumentClient();