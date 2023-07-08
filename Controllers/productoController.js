const ProductosModel = require('../Models/productoModel');


const listarProds = async(req, res) => {
    //res.send("Welcome listarProds")
    const allProds = await ProductosModel.find()
    try{
        res.send(allProds);
        console.log(allProds);
    }catch(error){
        res.status(500).send(error);
        console.log(error)
    }
}

const getProd = async(req, res) => {
    const id = req.params.id
    const prod = await ProductosModel.findById(id)
    try{
        res.send(prod);
        console.log(prod);
    }catch(error){
        res.status(500).send(error);
    }
}

const insertProd = async(req, res) => {
    const nombre = req.body.nombre;
    const color = req.body.color;

    const allProds = await new ProductosModel({ nombre: nombre, color: color }).save();
    try{
        res.send(allProds);
        console.log(allProds);
    }catch(error){
        res.status(500).send(error);
    }
}

const updateProd = async(req, res) => {
    const id = req.params.id
    const prod = await ProductosModel.findByIdAndUpdate(
        id,
        {$set: req.body}
        )
    try{
        res.send(prod);
        console.log(prod);
    }catch(error){
        res.status(500).send(error);
    }
}

const deleteProd = async(req, res) => {
    const id = req.params.id
    const prod = await ProductosModel.findByIdAndDelete(id)//puede también ser mas datos con: req.params
    try{
        res.send(prod);
        console.log(prod);
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    listarProds,
    getProd,
    insertProd,
    updateProd,
    deleteProd
}