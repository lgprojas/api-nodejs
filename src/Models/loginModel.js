const {Login} = require('../Schemas/usuarioSchema');
const { compare } = require('../Helpers/handleBcrypt');

const getUsuarioLogin = async(newLogin) => {

    //return "loginModel"
    
    const { usuario, clave } = newLogin
    //console.log(usuario)
    //console.log(clave)
    
    //return usuario + " | " + clave
    try{
        
        
    
    const datosUsu = await Login.findOne({ usuario: usuario}).exec()
    /*const { email } = datosUsu        
    console.log(email)
    return datosUsu
    }catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }*/
  /*
    try{
        
        
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
  */
        if(!datosUsu){
            return;
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

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }

    
    
}

module.exports = { getUsuarioLogin }