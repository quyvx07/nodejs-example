// const dynamoDB = require('../dbs/init.database');
const AWS = require('aws-sdk');

const config = require("../configs/config");

AWS.config.update({
    region: config.db.REGION,
    endpoint: config.db.ENDPOINT
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

class Repository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async create(movie) {
        const params = {
            TableName: this.tableName,
            Item: movie
        };
        return dynamoDB.put(params).promise();
    }

    async read(key) {
        const params = {
            TableName: this.tableName,
            Key: key
        };
        return dynamoDB.get(params).promise();
    }

    async update(key, updateExpression, expressionAttributeValues) {
        const params = {
            TableName: this.tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'UPDATED_NEW'
        };
        return dynamoDB.update(params).promise();
    }

    async delete(key) {
        const params = {
            TableName: this.tableName,
            Key: key
        };
        return dynamoDB.delete(params).promise();
    }
}

module.exports = Repository;