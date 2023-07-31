const Router  = require("express");
const router = Router();

const loginController = require('../../Controllers/loginController')


router.post('/', loginController.loginUsu);
router.post('/refreshToken', loginController.refreshToken);

module.exports = router;