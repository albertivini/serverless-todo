import { APIGatewayProxyResult } from "aws-lambda"
import { ICustomAPIGateway } from "src/interfaces/ICustomAPIGateway"
import { documentRepository } from "src/repository/document"

export const handler= async (event: ICustomAPIGateway) : Promise<APIGatewayProxyResult> => {

    const { user_id } = event.pathParameters

    const { title, deadline, done } =  JSON.parse(event.body)

    const document = new documentRepository()

    await document.put({ user_id, title, done, deadline})

    return {
        statusCode: 201,
        body: JSON.stringify({
            messsage: "To do adicionado"
        })
    }
}