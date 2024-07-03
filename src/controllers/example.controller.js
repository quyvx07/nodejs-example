const { Ok } = require("../core/success.response");
const ExampleService = require("../services/example.service");

class ExampleController {
    example = async (req, res, next) => {
        new Ok({ metadata: await ExampleService.example() }).send(res)
    }
}

module.exports = new ExampleController()