const loginService = require('../Services/loginService');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../Middleware/jwt');


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
        const refreshToken = generateRefreshToken({id: _id, email: email})
    
    
        const datosUsuToken = {nombre, email, token, refreshToken}
    
        res.status(200).send({ status: "OK", data: datosUsuToken });
    }else{
        res.status(204).send();
    }

    
    
}

const refreshToken = async(req, res) => {

    const refreshToken = req.headers.refresh;

    if(!(refreshToken)){
        res.status(400).json({ message: "[Refresh] Something goes wrong!" });
    }

    try {
       console.log(refreshToken)

    } catch (error) {
        return res.status(400).json({ message: "[Refresh] Something goes wrong 02!" });
    }
}

module.exports = {loginUsu, refreshToken}