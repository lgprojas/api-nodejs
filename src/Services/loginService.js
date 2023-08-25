const LoginModel = require('../Models/loginModel');
const { encrypt } = require('../Helpers/handleBcrypt');

const createNewLogin = (newLogin) => {

    const {usuario, clave} = newLogin
    const password = encrypt(clave);

    const datosUsu = {
        usuario,
        password
    }

    const getUsuario = LoginModel.getUsuarioLogin(datosUsu);
    return getUsuario;
};

const createNewToken = (datosUsu) => {

    const newRefreshToken = LoginModel.newRefreshToken(datosUsu);
    return newRefreshToken;
};

module.exports = { createNewLogin, createNewToken }