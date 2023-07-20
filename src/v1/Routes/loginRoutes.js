const Router  = require("express");
const router = Router();

const loginController = require('../../Controllers/loginController')


router.post('/', loginController.loginUsu);

module.exports = router;