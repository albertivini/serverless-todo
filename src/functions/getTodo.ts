import { APIGatewayProxyResult } from "aws-lambda"
import { ICustomAPIGateway } from "src/interfaces/ICustomAPIGateway"
import { documentRepository } from "src/repository/document"

export const handler= async (event: ICustomAPIGateway) : Promise<APIGatewayProxyResult> => {

    const { user_id } = event.pathParameters

    const document = new documentRepository()

    const response = await document.query(user_id)

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}