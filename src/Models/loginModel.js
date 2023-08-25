const {Login} = require('../Schemas/usuarioSchema');
const { compare, encrypt } = require('../Helpers/handleBcrypt');

const getUsuarioLogin = async(req, res) => {

    //return "loginModel"
    
    const { usuario, clave } = req

    const password = await encrypt(clave);
    //console.log(usuario)
    //console.log(clave)
    
    //return usuario + " | " + clave

    
    const datosUsu = await Login.findOne({ usuario: usuario }, function (err, data) {
        if(err){
            return err
        }else{
            console.log(data)
            res.send(data);
        }
    });
    return datosUsu
    if(datosUsu === null){
        throw {
            status: 404,
            message: "User not found"
        }
    }

    try{
        
        
    
    
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

module.exports = { getUsuarioLogin, newRefreshToken }