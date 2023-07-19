const loginService = require('../Services/loginService');
const { generateToken } = require('../Middleware/jwt');


const loginUsu = async(req, res) => {

    
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    
    
    
    if (
        !usuario ||
        !clave
    ) {
        return;
    }

    const newLogin = {
        usuario: usuario,
        clave: clave
    }
    
    const datosUsu = await loginService.createNewLogin(newLogin);
    
    if(datosUsu){
        const { _id, nombre, email} = datosUsu

        //aquí podría agregar el token a la session
        const token = generateToken({id: _id, email: email})
    
    
        const datosUsuToken = {nombre, email, token}
    
        res.status(200).send({ status: "OK", data: datosUsuToken });
    }else{
        res.status(204).send();
    }

    
    
}

module.exports = {loginUsu}