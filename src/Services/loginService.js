const LoginModel = require('../Models/loginModel');

const createNewLogin = (newLogin) => {

    const usuario = LoginModel.getUsuarioLogin(newLogin);
    return usuario;
};

const createNewToken = (emailUsu) => {

    const newRefreshToken = LoginModel.newRefreshToken(emailUsu);
    return newRefreshToken;
};

module.exports = { createNewLogin, createNewToken }