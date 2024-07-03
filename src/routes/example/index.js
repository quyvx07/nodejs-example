
const express = require('express');
const exampleController = require('../../controllers/example.controller');
const { asyncHandler } = require('../../utils/utils');
const router = express.Router();

router.get('/', asyncHandler(exampleController.example))

module.exports = router