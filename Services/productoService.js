const ProductoModel = require('../Schemas/productoModel');


const listarProds = async(req, res) => {

    const allProds = await ProductoModel.find({ })
    try{
        res.send(allProds);
        console.log(allProds);
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getAllWorkouts
};