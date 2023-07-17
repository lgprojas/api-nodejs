const bcrypt = require('bcryptjs');

const encrypt = async(clave) => {
    const hash = await bcrypt.hash(clave, 10)
    return hash
}

const compare = async(passwordLogin, passwordEncrypt) => {
    return await bcrypt.compare(passwordLogin, passwordEncrypt)
}

module.exports = {
    encrypt,
    compare
}