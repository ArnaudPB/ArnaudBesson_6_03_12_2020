const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const { deleteOne } = require('../models/sauce');

router.get('/', sauceCtrl.getAllSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.post('/', sauceCtrl.createSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);

module.exports = router;