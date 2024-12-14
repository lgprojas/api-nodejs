const permisoService = require('../Services/permisoService');
const mongoose = require('mongoose');


const listarPermisos = async(req, res) => {

    const datosAllPermisos = await permisoService.getAllPermisos();

    res.status(201).send({ status: "OK", data: datosAllPermisos });
}

const getPermiso = async(req, res) => {

    const id = req.params.id

    if (!id || mongoose.isValidObjectId(id) == false) {
        const msg = { message: "The id provided is not valid, " +  id };
        res.status(404).send(msg);
        return;
    }

    const idPermiso = {
        id: id,
    }

    const allDatosPermiso = await permisoService.getPermiso(idPermiso);

    if (!allDatosPermiso) {
        return;
    }
    
    const { nom_perm, key_perm } = allDatosPermiso

    //aquí podría agregar el token a la session

    const datosPermiso = {nom_perm, key_perm}

    res.status(201).send({ status: "OK", data: datosPermiso });
}

const insertPermiso = async(req, res) => {

    const { body } = req;
    if (
        !body.nom || !body.key
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
    const newPermiso = {
        nom: body.nom,
        key: body.key
    };

    try {
        const createdPermiso = await permisoService.insertPermiso(newPermiso);
        res.status(201).send({ status: "OK", data: createdPermiso });
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const updatePermiso = async(req, res) => {

    const { body, params: { id }, } = req

    if(!id){
        res.status(400)
           .send({
                status: "Failed",
                data: { error: "Value :id is empty"},
           });
    }

    try{
        const updatePermiso = await permisoService.updatePermiso(id, body)
        res.send({ status: "Ok", data: updatePermiso})

    }catch(error){
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error }})
    }
    
}

const deletePermiso = async(req, res) => {

    const { params: id} = req

    if(!id){
        res.status(400)
           .send({
            status: "FAILED", 
            data: { error: 'The id not exist' },
        });
    }

    try {
        await permisoService.deletePermiso(id);
        res.send({ 
            status: "OK",
            message: "Permiso deleted" 
        });

    }catch(error){
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    listarPermisos,
    getPermiso,
    insertPermiso,
    updatePermiso,
    deletePermiso,
}