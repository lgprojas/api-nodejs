const LoginModel = require('../Models/loginModel');

const createNewLogin = (newLogin) => {

    const usuario = LoginModel.getUsuarioLogin(newLogin);
    return usuario;
};

const createNewToken = (datosUsu) => {

    const newRefreshToken = LoginModel.newRefreshToken(datosUsu);
    return newRefreshToken;
};

module.exports = { createNewLogin, createNewToken }