const UsuarioModel = require('../Models/usuarioModel');
const { v4: uuidv4 } = require('uuid');
const { encrypt } = require('../Helpers/handleBcrypt');

const getAllUsus = () => {

    const usuarios = UsuarioModel.getAllUsus();
    return usuarios;
}

const getUsu = (idUsu) => {

    const usuario = UsuarioModel.getUsu(idUsu);
    return usuario;
}

const insertUsu = async(newUsu) => {

    const {nombre, email, usuario, clave} = newUsu
    
    const cod = uuidv4();//genera cód único
    const password = await encrypt(clave);

    const userToInsert = {
        nombre: nombre,
        email: email,
        codigo: cod,
        usuario: usuario,
        clave: password,
        createdAt: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }),
        updatedAt: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }),
      };

    try {
        const datosUsuario = await UsuarioModel.insertUsu(userToInsert);
        return datosUsuario;
    } catch (error) {
        throw error;
    }

}

const updateUsu = async(userId, newDatos) => {
    try {
        const updateUser = await UsuarioModel.updateUsu(userId, newDatos);
        return updateUser;

    }catch(error){
        throw error;
    }
}

const deleteUsu = async(Idusu) => {
    try {
        const usu = await UsuarioModel.deleteUsu(Idusu);
        return usu;
        
    }catch(error){
        throw error;
    }
}

module.exports = { 
    getAllUsus,
    getUsu,
    insertUsu,
    updateUsu,
    deleteUsu,
}