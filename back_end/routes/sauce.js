const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const { deleteOne } = require('../models/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/about', function(req, res) {
    res.send('About this wiki');
})

router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;