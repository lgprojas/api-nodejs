const {Login} = require('../Schemas/usuarioSchema');
const {Token} = require('../Schemas/tokenSchema');
const { compare } = require('../Helpers/handleBcrypt');

const getUsuarioLogin = async(req, res) => {

    const { usuario, clave } = req

    const datosUsu = await Login.findOne({ usuario: usuario });

    if(datosUsu === null){
        throw {
            status: 404,
            message: "User not found"
        }
    }

    try{

        const checkPassword = await compare(clave, datosUsu.clave)
        
        if(checkPassword){

            const {_id, nombre, email} = datosUsu
            //const nDatos = {...datosUsu, token}
            const nDatos = {_id, nombre, email}
            return nDatos;

        }else{
            throw {
                status: 409,
                message: "Invalid password"
            }
        }

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }

}

const newRefreshToken = async(dUsu) => {

    try{

        const {email} = dUsu

        const datosUsu = await Login.findOne({ email: email}).exec()

        if(!datosUsu){
            return;
        }

        const {_id, nombre} = datosUsu
            //const nDatos = {...datosUsu, token}
            const nDatos = {_id, nombre, email}
            return nDatos;

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const saveTokenBD = async(refreshToken) => {

    try{

        const existe = await Token.findOne({ token: refreshToken}).exec()

        if(existe){
            throw {
                status: 409,
                message: "RefreshToken exist"
            }
        }

        const tokenSave = await new Token({ 
            token: refreshToken,
        }).save()

        return tokenSave

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const signOut = async(refreshToken) => {

    try{

        const existe = await Token.findOne({ token: refreshToken}).exec()

        if(!existe){
            throw {
                status: 409,
                message: "RefreshToken does not exist"
            }
        }

        const tokenDelete = await Token.findOneAndDelete({ token: refreshToken })

        if(!tokenDelete){
            throw {
                status: 409,
                message: "RefreshToken could not been deleted"
            }
        }

        return

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = { getUsuarioLogin, saveTokenBD, newRefreshToken, signOut }