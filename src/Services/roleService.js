const RoleModel = require('../Models/roleModel');

const getAllRoles = () => {

    const roles = RoleModel.getAllRoles();
    return roles;
}

const getRole = (idRole) => {

    const role = RoleModel.getRole(idRole);
    return role;
}

const insertRole = async(newRole) => {

    const {nom} = newRole

    const roleToInsert = {
        nom: nom,
      };

    try {
        const datosRole = await RoleModel.insertRole(roleToInsert);
        return datosRole;
    } catch (error) {
        throw error;
    }

}

const updateRole = async(roleId, newDatos) => {
    try {
        const updateRole = await RoleModel.updateRole(roleId, newDatos);
        return updateRole;

    }catch(error){
        throw error;
    }
}

const deleteRole = async(Idrole) => {
    try {
        const role = await RoleModel.deleteRole(Idrole);
        return role;
        
    }catch(error){
        throw error;
    }
}

module.exports = { 
    getAllRoles,
    getRole,
    insertRole,
    updateRole,
    deleteRole,
}