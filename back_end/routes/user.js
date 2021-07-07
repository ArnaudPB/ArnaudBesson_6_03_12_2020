const express = require('express');
const router = express.Router();

const validate = require('../middleware/validate_input');
const userCtrl = require('../controllers/user');

router.post('/signup', validate.user, userCtrl.signup);
router.post('/login', validate.user, userCtrl.login);

module.exports = router;