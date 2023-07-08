const Login = require('../Schemas/usuarioSchema');
const { compare } = require('../Helpers/handleBcrypt');

const getUsuarioLogin = async(newLogin) => {

    const { usuario, clave } = newLogin
    console.log(usuario)
    console.log(clave)

    const datosUsu = await Login.findOne({ usuario: usuario }).lean();//quita state, etc
    if(!datosUsu){
        throw {
            status: 404,
            message: "User not found"
        }
    }

    const checkPassword = compare(clave, datosUsu.clave)
    
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
    
}

module.exports = { getUsuarioLogin }