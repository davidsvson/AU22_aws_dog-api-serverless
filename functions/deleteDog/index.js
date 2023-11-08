const { sendResponse } = require("../../responses");
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

// DELETE /dogs/{dogId}

exports.handler = async (event, context) => {
    const { dogId } = event.pathParameters;
    
    try {
        await db.delete({
            TableName: 'dogs-db',
            Key : { id: dogId }
        }).promise();

        return sendResponse(200, { success: true });
    } catch (error) {
        return sendResponse(500, { success: false, message : 'could not delete dog'});
    }


}