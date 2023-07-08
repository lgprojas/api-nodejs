const Router  = require("express");
const router = Router();

const productoController = require('../Controllers/productoController');

// router.get('/producto/listarProds', (req, res) => {
//     res.send("Hola desde listarProds!");
//     console.log("Hola desde listarProds!");
// });

router.get('/', productoController.listarProds);

//router.get('/producto/getProd/:id', prodController.getProd);

module.exports = router;