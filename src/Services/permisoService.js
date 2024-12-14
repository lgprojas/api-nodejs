const PermisoModel = require('../Models/permisoModel');

const getAllPermisos = () => {

    const permisos = PermisoModel.getAllPermisos();
    return permisos;
}

const getPermiso = (idPermiso) => {

    const permiso = PermisoModel.getPermiso(idPermiso);
    return permiso;
}

const insertPermiso = async(newPermiso) => {

    const {nom, key} = newPermiso

    const permisoToInsert = {
        nom: nom,
        key: key,
      };

    try {
        const datosPermiso = await PermisoModel.insertPermiso(permisoToInsert);
        return datosPermiso;
    } catch (error) {
        throw error;
    }

}

const updatePermiso = async(permisoId, newDatos) => {
    try {
        const updatePermiso = await PermisoModel.updatePermiso(permisoId, newDatos);
        return updatePermiso;

    }catch(error){
        throw error;
    }
}

const deletePermiso = async(Idpermiso) => {
    try {
        const permiso = await PermisoModel.deletePermiso(Idpermiso);
        return permiso;
        
    }catch(error){
        throw error;
    }
}

module.exports = { 
    getAllPermisos,
    getPermiso,
    insertPermiso,
    updatePermiso,
    deletePermiso,
}