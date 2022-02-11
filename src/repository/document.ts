import * as AWS from "aws-sdk"
import {  IPutRequest } from "src/interfaces/Idocument"
import { v4 as uuid } from "uuid"


export class documentRepository {
    private docClient: AWS.DynamoDB.DocumentClient

    constructor () {
        this.docClient = new AWS.DynamoDB.DocumentClient()
    }

    async put ({user_id, deadline, done = false, title}: IPutRequest): Promise<void> {

        const params = {
            TableName: "todos",
            Item: {
                id: uuid(),
                user_id,
                done,
                title,
                deadline
            }
        }

        await this.docClient.put(params).promise()
    }

    async query (user_id: string) {
        const params = {
            TableName: "todos",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": user_id
            }
        }

        const response = await this.docClient.query(params).promise()

        return response.Items
    }
}