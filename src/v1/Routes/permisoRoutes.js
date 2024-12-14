const Router  = require("express");
const { verifyToken } = require('../../Middleware/jwt');
const router = Router();

const permController = require('../../Controllers/permisoController')

/*router.route("/").get((req, res) => {
    res.send("Get all Usuucts");
  });*/

router.get('/', permController.listarPermisos);

//router.get('/:id', verifyToken, permController.getPermiso);
router.get('/:id', permController.getPermiso);

router.post('/', permController.insertPermiso);

router.patch('/:id', permController.updatePermiso);//Put debe envair todo, Patch sólo lo necesario

router.delete('/:id', permController.deletePermiso);

module.exports = router;