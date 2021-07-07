const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const { deleteOne } = require('../models/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { post } = require('../app');
const validate = require('../middleware/validate_input');


router.get('/about', function(req, res) {
    res.send('About this wiki');
})

router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, validate.id, sauceCtrl.getOneSauce);
router.post('/', auth, multer, validate.sauce, sauceCtrl.createSauce);
router.put('/:id', auth, multer, validate.id, validate.sauce, sauceCtrl.modifySauce);
router.delete('/:id', auth, validate.id, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, validate.id, sauceCtrl.likeSauce);

module.exports = router;