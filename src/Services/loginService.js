const LoginModel = require('../Models/loginModel');
const { encrypt } = require('../Helpers/handleBcrypt');

const createNewLogin = async(newLogin) => {

    const {usuario, clave} = newLogin
    const password = await encrypt(clave);

    const datosUsu = {
        usuario,
        password
    }

    try{
        const getUsuario = await LoginModel.getUsuarioLogin(datosUsu);
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