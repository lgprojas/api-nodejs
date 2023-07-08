const usuarioService = require('../Services/usuarioService');
const mongoose = require('mongoose');


const listarUsus = async(req, res) => {

    const datosAllUsus = await usuarioService.getAllUsus();

    res.status(201).send({ status: "OK", data: datosAllUsus });
}

const getUsu = async(req, res) => {

    const id = req.params.id

    if (!id || mongoose.isValidObjectId(id) == false) {
        const msg = { message: "The id provided is not valid, " +  id };
        res.status(404).send(msg);
        return;
    }

    const idUsu = {
        id: id,
    }

    const allDatosUsu = await usuarioService.getUsu(idUsu);

    if (!allDatosUsu) {
        return;
    }
    
    const { nombre, email} = allDatosUsu

    //aquí podría agregar el token a la session

    const datosUsu = {nombre, email}

    res.status(201).send({ status: "OK", data: datosUsu });
}

const insertUsu = async(req, res) => {

    const { body } = req;
    if (
        !body.nombre ||
        !body.email ||
        !body.usuario ||
        !body.clave 
    ) {
         res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "One of the values is empty",
            },
        });
        return;
    }
    const newUsu = {
        nombre: body.nombre,
        email: body.email,
        usuario: body.usuario,
        clave: body.clave,
    };

    try {
        const createdUser = await usuarioService.insertUsu(newUsu);
        res.status(201).send({ status: "OK", data: createdUser });
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const updateUsu = async(req, res) => {

    const { body, params: { id }, } = req

    if(!id){
        res.status(400)
           .send({
                status: "Failed",
                data: { error: "Value :id is empty"},
           });
    }

    try{
        const updateUser = await usuarioService.updateUsu(id, body)
        res.send({ status: "Ok", data: updateUser})

    }catch(error){
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error }})
    }
    
}

const deleteUsu = async(req, res) => {

    const { params: id} = req

    if(!id){
        res.status(400)
           .send({
            status: "FAILED", 
            data: { error: 'The id not exist' },
        });
    }

    try {
        await usuarioService.deleteUsu(id);
        res.send({ 
            status: "OK",
            message: "User deleted" 
        });

    }catch(error){
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    listarUsus,
    getUsu,
    insertUsu,
    updateUsu,
    deleteUsu,
}