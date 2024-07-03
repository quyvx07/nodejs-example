const { BadErrorResponse } = require("../core/error.response")

class ExampleService {

    static example = async () => {
        return {
            name: "name"
        }
    }
}

module.exports = ExampleService