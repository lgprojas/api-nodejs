const Router  = require("express");
const router = Router();

const usuarioController = require('../../Controllers/usuarioController')

/*router.route("/").get((req, res) => {
    res.send("Get all Usuucts");
  });*/

router.get('/', usuarioController.listarUsus);

router.get('/:id', usuarioController.getUsu);

router.post('/', usuarioController.insertUsu);

router.patch('/:id', usuarioController.updateUsu);//Put debe envair todo, Patch sólo lo necesario

router.delete('/:id', usuarioController.deleteUsu);

module.exports = router;