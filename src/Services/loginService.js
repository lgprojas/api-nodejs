const LoginModel = require('../Models/loginModel');
const { encrypt } = require('../Helpers/handleBcrypt');

const createNewLogin = (newLogin) => {

    try{
        const getUsuario = LoginModel.getUsuarioLogin(newLogin);
        return getUsuario;
    } catch (error) {
        throw error;
    }

};

const createNewToken = (datosUsu) => {

    const newRefreshToken = LoginModel.newRefreshToken(datosUsu);
    return newRefreshToken;
};

module.exports = { createNewLogin, createNewToken }