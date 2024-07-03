// const dynamodb = require("../dbs/init.database");
const AWS = require('aws-sdk');
const config = require("../configs/config");

AWS.config.update({
    region: config.db.REGION || 'us-east-1',
    endpoint: config.db.ENDPOINT || 'http://localhost:8000'
});
const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: 'Example',
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

const checkTableExists = async (tableName) => {
    try {
        await dynamodb.describeTable({ TableName: tableName }).promise();
        return true;
    } catch (error) {
        if (error.code === 'ResourceNotFoundException') {
            return false;
        }
        throw error;
    }
};

const createTable = async () => {
    const tableExists = await checkTableExists(params.TableName);
    if (tableExists) {
        console.log(`Table "${params.TableName}" already exists. Skipping creation.`);
        return;
    }

    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
        }
    });
};

createTable().catch(console.error);
