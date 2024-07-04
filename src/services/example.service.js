const Repository = require("../utils/Repository");

class ExampleService {
    constructor() {
        this.repository = new Repository('Example');
    }

    create = async (data) => {
        return this.repository.create(data)
    }

    async getAll(limit, lastEvaluatedId) {
        return this.repository.readAll(limit, lastEvaluatedId);
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