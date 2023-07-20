const LoginModel = require('../Models/loginModel');

const createNewLogin = (newLogin) => {

    const usuario = LoginModel.getUsuarioLogin(newLogin);
    return usuario;
};

module.exports = { createNewLogin }