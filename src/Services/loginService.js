const LoginModel = require('../Models/loginModel');


const createNewLogin = (newLogin) => {

    try{
        const getUsuario = LoginModel.getUsuarioLogin(newLogin);
        return getUsuario;
    } catch (error) {
        throw error;
    }

};

const saveTokenBD = (refreshToken) => {

    try{
        const getResult = LoginModel.saveTokenBD(refreshToken);
        return getResult;
    } catch (error) {
        throw error;
    }

};

const createNewToken = (datosUsu) => {

    const newRefreshToken = LoginModel.newRefreshToken(datosUsu);
    return newRefreshToken;
};

module.exports = { createNewLogin, saveTokenBD, createNewToken }