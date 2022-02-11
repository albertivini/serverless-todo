import * as sinon from "sinon"
import { expect } from "chai"
import { documentRepository } from "../src/repository/document"
import { handler } from "../src/functions/putTodo"
import { ICustomAPIGateway} from "../src/interfaces/ICustomAPIGateway"

let sandbox: sinon.SinonSandbox

describe("Test Suit: Put Todo", async () => {

    beforeEach('Before each test', async () => {
        sandbox = sinon.createSandbox();
    });
    
    afterEach('After each test', async () => {
        sandbox.restore();
    });

    it("Success: Put Todo", async () => {

        sandbox.stub(documentRepository.prototype, 'put').resolves()

        const event: ICustomAPIGateway = {
            body: JSON.stringify({
                title: 'To Do',
                deadline: "2022-02-13T22:22:25.447Z",
                done: false
            }),
            pathParameters: {
                user_id: 'uuid'
            }
        }

        const response = await handler(event)

        expect(response.statusCode).to.be.equal(201)
    })

})