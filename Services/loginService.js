const LoginModel = require('../Models/loginModel');

const createNewLogin = async(newLogin) => {

    const usuario = await LoginModel.getUsuarioLogin(newLogin);
    return usuario;
};

module.exports = { createNewLogin }