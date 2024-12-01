const {Role} = require('../Schemas/roleSchema');
const {ObjectId} = require('mongodb');
const moment = require('moment-timezone');

const getAllRoles = async() => {

    const datosAllRoles = await Role.find({ }).lean();//quita state, etc
    if(!datosAllRoles){
        throw {
            status: 404,
            message: "Roles not found"
        }
    }else{
        return datosAllRoles
    }

}

const getRole = async(idRole) => {

    const id = ObjectId(idRole)
    console.log(id)
    const datosRole = await Role.findOne({"_id": id}).lean();

    if (!datosRole) {
        throw {
            status: 404,
            message: "Role not found"
        }
    }
    return datosRole;
}

const insertRole = async(newRole) => {

    const nom = newRole.nom

    const existeRole = await Role.findOne({"nom_role": nom}).exec();
        
        if (existeRole) {
            throw {
                status: 404,
                message: "Role exist",
            }
        }

    try{        

        //Usuario.init();
        
        const datosNewRole = await new Role({ 
            nom_role: nom,
        }).save()
        
        //await datosNewUser.save();

        return datosNewRole;

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const updateRole = async(idRole, newDatos) => {

    const nom = newDatos.nom
    const id = idRole

    try {
        const existeRole = await Role.findOne({"nom_role": nom}).exec();
        
        if(existeRole){
            throw {
                status: 400,
                message: `Ya existe un rol con el nombre '${nom}' en los registros`
            };
        }

        const existeId = await Role.findOne({"_id": id}).exec();

        if(!existeId){
            throw {
                status: 400,
                message: `No existe un rol con el id '${id}' en los registros`
            };
        }

        const datosRole = {
            ...newDatos,
        }
        
        const datosRol = await Role.updateOne(
                {"_id": id},
                {$set : datosRole},
            );

        return datosRole;

    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const deleteRole = async(idRole) => {

    const id = ObjectId(idRole)

    try {

        const existeId = await Role.findOne({"_id": id}).exec();

        if(!existeId){
            throw {
                status: 400,
                message: `No existe un rol con el id '${id}' en los registros`
            };
        }

        const role = await Role.findByIdAndDelete(id)
        return role;
        
    }catch(error){

        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = {
    getAllRoles,
    getRole,
    insertRole,
    updateRole,
    deleteRole,
}