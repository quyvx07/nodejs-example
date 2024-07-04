
const express = require('express');
const exampleController = require('../../controllers/example.controller');
const { asyncHandler } = require('../../utils/utils');
const router = express.Router();

router.get('/', asyncHandler(exampleController.getAll))
router.get('/:id', asyncHandler(exampleController.get))
router.delete('/:id', asyncHandler(exampleController.delete))
router.post('/', asyncHandler(exampleController.create))
router.put('/', asyncHandler(exampleController.update))

module.exports = router