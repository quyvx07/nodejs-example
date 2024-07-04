const { Ok } = require("../core/success.response");
const logger = require("../loggers/logger.log");
const ExampleService = require("../services/example.service");

class ExampleController {
    constructor() {
        this.exampleService = new ExampleService();
    }

    create = async (req, res, next) => {
        new Ok({ metadata: await this.exampleService.create(req.body) }).send(res)
    }

    getAll = async (req, res, next) => {
        const { limit, lastEvaluatedId } = req.query;
        const parsedLastEvaluatedId = lastEvaluatedId ? parseInt(lastEvaluatedId) : null;
        new Ok({ metadata: await this.exampleService.getAll(limit, parsedLastEvaluatedId) }).send(res)
    }

    get = async (req, res, next) => {
        const { id } = req.params;
        logger.log('This is a log message', ['/v1/api/login', req, { param: "sss" }]);
        new Ok({ metadata: await this.exampleService.get({ id: parseInt(id) }) }).send(res)
    }

    delete = async (req, res, next) => {
        const { id } = req.params;
        new Ok({ metadata: await this.exampleService.delete({ id: parseInt(id) }) }).send(res)
    }

    update = async (req, res, next) => {
        const key = req.body.key;
        const updateExpression = req.body.updateExpression;
        const expressionAttributeValues = req.body.expressionAttributeValues;
        new Ok({ metadata: await this.exampleService.update(key, updateExpression, expressionAttributeValues) }).send(res)
    }
}

module.exports = new ExampleController()