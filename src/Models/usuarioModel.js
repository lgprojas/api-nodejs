const {Usuario} = require('../Schemas/usuarioSchema');
const {ObjectId} = require('mongodb');
const moment = require('moment-timezone');

const getAllUsus = async() => {

    const datosAllUsus = await Usuario.find({ }).lean();//quita state, etc
    if(!datosAllUsus){
        throw {
            status: 404,
            message: "Users not found"
        }
    }else{
        return datosAllUsus
    }

}

const getUsu = async(idUsu) => {

    const id = ObjectId(idUsu)
    console.log(id)
    const datosUsu = await Usuario.findOne({"_id": id}).lean();

    if (!datosUsu) {
        throw {
            status: 404,
            message: "User not found"
        }
    }
    return datosUsu;
}

const insertUsu = async(newUsu) => {

    const email = newUsu.email

    const existeUsu = await Usuario.findOne({"email": email}).exec();
        
        if (existeUsu) {
            throw {
                status: 404,
                message: "User exist",
            }
        }

    try{        

        //Usuario.init();
        
        const datosNewUser = await new Usuario({ 
            nombre: newUsu.nombre, 
            email: newUsu.email,        
            codigo: newUsu.codigo,
            usuario: newUsu.usuario,
            clave: newUsu.clave,
            createdAt: newUsu.createdAt,
            updatedAt: newUsu.updatedAt,
        }).save()
        
        //await datosNewUser.save();

        return datosNewUser;

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const updateUsu = async(idUsu, newDatos) => {

    const email = newDatos.email
    const id = idUsu

    try {
        const existeEmail = await Usuario.findOne({"email": email}).exec();
        
        if(existeEmail){
            throw {
                status: 400,
                message: `Ya existe un usuario con el correo '${email}' en los registros`
            };
        }

        const existeId = await Usuario.findOne({"_id": id}).exec();

        if(!existeId){
            throw {
                status: 400,
                message: `No existe un usuario con el id '${id}' en los registros`
            };
        }

        const datosUsu = {
            ...newDatos,
            updatedAt: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }),
        }
        
        const datosUser = await Usuario.updateOne(
                {"_id": id},
                {$set : datosUsu},
            );

        return datosUsu;

    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const deleteUsu = async(idUsu) => {

    const id = ObjectId(idUsu)

    try {

        const existeId = await Usuario.findOne({"_id": id}).exec();

        if(!existeId){
            throw {
                status: 400,
                message: `No existe un usuario con el id '${id}' en los registros`
            };
        }

        const usu = await Usuario.findByIdAndDelete(id)
        return usu;
        
    }catch(error){

        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = {
    getAllUsus,
    getUsu,
    insertUsu,
    updateUsu,
    deleteUsu,
    deleteUsu,
}