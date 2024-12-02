const roleService = require('../Services/roleService');
const mongoose = require('mongoose');


const listarRoles = async(req, res) => {

    const datosAllRoles = await roleService.getAllRoles();

    res.status(201).send({ status: "OK", data: datosAllRoles });
}

const getRole = async(req, res) => {

    const id = req.params.id

    if (!id || mongoose.isValidObjectId(id) == false) {
        const msg = { message: "The id provided is not valid, " +  id };
        res.status(404).send(msg);
        return;
    }

    const idRole = {
        id: id,
    }

    const allDatosRole = await roleService.getRole(idRole);

    if (!allDatosRole) {
        return;
    }
    
    const { nom_role } = allDatosRole

    //aquí podría agregar el token a la session

    const datosRole = {nom_role}

    res.status(201).send({ status: "OK", data: datosRole });
}

const insertRole = async(req, res) => {

    const { body } = req;
    if (
        !body.nom
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
    const newRole = {
        nom: body.nom
    };

    try {
        const createdRole = await roleService.insertRole(newRole);
        res.status(201).send({ status: "OK", data: createdRole });
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const updateRole = async(req, res) => {

    const { body, params: { id }, } = req

    if(!id){
        res.status(400)
           .send({
                status: "Failed",
                data: { error: "Value :id is empty"},
           });
    }

    try{
        const updateRole = await roleService.updateRole(id, body)
        res.send({ status: "Ok", data: updateRole})

    }catch(error){
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error }})
    }
    
}

const deleteRole = async(req, res) => {

    const { params: id} = req

    if(!id){
        res.status(400)
           .send({
            status: "FAILED", 
            data: { error: 'The id not exist' },
        });
    }

    try {
        await roleService.deleteRole(id);
        res.send({ 
            status: "OK",
            message: "Role deleted" 
        });

    }catch(error){
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    listarRoles,
    getRole,
    insertRole,
    updateRole,
    deleteRole,
}