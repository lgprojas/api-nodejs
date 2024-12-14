const {Permiso} = require('../Schemas/permisoSchema');
const {ObjectId} = require('mongodb');
const moment = require('moment-timezone');

const getAllPermisos = async() => {

    const datosAllPermisos = await Permiso.find({ }).lean();//quita state, etc
    if(!datosAllPermisos){
        throw {
            status: 404,
            message: "Permisos not found"
        }
    }else{
        return datosAllPermisos
    }

}

const getPermiso = async(idPermiso) => {

    const id = ObjectId(idPermiso)
    console.log(id)
    const datosPermiso = await Permiso.findOne({"_id": id}).lean();

    if (!datosPermiso) {
        throw {
            status: 404,
            message: "Permiso not found"
        }
    }
    return datosPermiso;
}

const insertPermiso = async(newPermiso) => {

    const nom = newPermiso.nom
    const key = newPermiso.key

    const existePermiso = await Permiso.findOne({"nom_perm": nom}).exec();
        
        if (existePermiso) {
            throw {
                status: 404,
                message: "Permiso exist",
            }
        }

    try{        

        //Usuario.init();
        
        const datosNewPermiso = await new Permiso({ 
            nom_perm: nom,
            key_perm: key,
        }).save()
        
        //await datosNewUser.save();

        return datosNewPermiso;

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const updatePermiso = async(idPermiso, newDatos) => {

    const key = newDatos.key
    const nom = newDatos.nom
    const id = idPermiso

    try {
        const existePermiso = await Permiso.findOne({"nom_perm": nom}).exec();
        
        if(existePermiso){
            throw {
                status: 400,
                message: `Ya existe un permiso con el nombre '${nom}' en los registros`
            };
        }

        const existeId = await Permiso.findOne({"_id": id}).exec();

        if(!existeId){
            throw {
                status: 400,
                message: `No existe un permiso con el id '${id}' en los registros`
            };
        }

        const datosPermiso = {
                nom_perm: nom,
                key_perm: key,
        }
        
        const datosPerm = await Permiso.updateOne(
                {"_id": id},
                {$set: datosPermiso},
            );

        return datosPermiso;

    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const deletePermiso = async(idPermiso) => {

    const id = ObjectId(idPermiso)

    try {

        const existeId = await Permiso.findOne({"_id": id}).exec();

        if(!existeId){
            throw {
                status: 400,
                message: `No existe un permiso con el id '${id}' en los registros`
            };
        }

        const permiso = await Permiso.findByIdAndDelete(id)
        return permiso;
        
    }catch(error){

        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = {
    getAllPermisos,
    getPermiso,
    insertPermiso,
    updatePermiso,
    deletePermiso,
}