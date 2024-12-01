const Router  = require("express");
const { verifyToken } = require('../../Middleware/jwt');
const router = Router();

const roleController = require('../../Controllers/roleController')

/*router.route("/").get((req, res) => {
    res.send("Get all Usuucts");
  });*/

router.get('/', roleController.listarRoles);

//router.get('/:id', verifyToken, roleController.getRole);
router.get('/:id', roleController.getRole);

router.post('/', roleController.insertRole);

router.patch('/:id', roleController.updateRole);//Put debe envair todo, Patch sólo lo necesario

router.delete('/:id', roleController.deleteRole);

module.exports = router;