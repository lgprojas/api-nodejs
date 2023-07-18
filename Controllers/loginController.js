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
    
    const { _id, nombre, email} = datosUsu

    //res.send(datosUsu)

    //aquí para abajo es el error
    //aquí podría agregar el token a la session
    const token = await generateToken({id: _id, email: email})
    const datosUsuToken = {nombre, email, token}

    res.status(201).send({ status: "OK", data: datosUsuToken });
    
}

module.exports = {loginUsu}