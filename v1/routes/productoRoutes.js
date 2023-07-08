const Router  = require("express");
const router = Router();

const productoController = require('../../Controllers/productoController')

/*router.route("/").get((req, res) => {
    res.send("Get all products");
  });*/

router.get('/', productoController.listarProds);

router.get('/:id', productoController.getProd);

router.post('/', productoController.insertProd);

router.patch('/:id', productoController.updateProd);//Put debe envair todo, Patch sólo lo necesario

router.delete('/:id', productoController.deleteProd);

module.exports = router;