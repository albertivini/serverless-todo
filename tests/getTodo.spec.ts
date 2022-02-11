import * as sinon from "sinon"
import { expect } from "chai"
import { documentRepository } from "../src/repository/document"
import queryResponse from "./data/queryResponse.json"
import { handler } from "../src/functions/getTodo"

let sandbox: sinon.SinonSandbox

describe("Test Suit: Get Todo", async () => {

    beforeEach('Before each test', async () => {
        sandbox = sinon.createSandbox();
    });
    
    afterEach('After each test', async () => {
        sandbox.restore();
    });

    it('Success: Get Todo', async () => {
        sandbox.stub(documentRepository.prototype, 'query').resolves(queryResponse)
    
        const event = {
            pathParameters: {
                user_id: 'uuid'
            }
        }
        const response = await handler(event)

        expect(response.statusCode).to.be.equal(200)
    })

})