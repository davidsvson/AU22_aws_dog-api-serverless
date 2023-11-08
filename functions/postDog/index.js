const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const db = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context) => {
    const dog = JSON.parse(event.body);

    const timestamp = new Date().getTime();

    dog.id = `${timestamp}`;

    try {
        await db.put({
            TableName: 'dogs-db',
            Item: dog
        }).promise()

        return sendResponse(200, {success: true});
    } catch (error) {
        return sendResponse(500, {success: false});
    }
}