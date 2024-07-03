const Repository = require("../utils/Repository");

class ExampleService {
    constructor() {
        this.repository = new Repository('Example');
    }

    create = async () => {
        return this.repository.create({ id: 1, title: 'quyvx' })
    }

    async get(key) {
        return this.repository.read(key);
    }

    async update(key, updateExpression, expressionAttributeValues) {
        return this.repository.update(key, updateExpression, expressionAttributeValues);
    }

    async delete(key) {
        return this.repository.delete(key);
    }
}

module.exports = ExampleService