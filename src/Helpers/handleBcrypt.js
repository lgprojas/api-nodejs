const bcrypt = require('bcryptjs');

const encrypt = (clave) => {
    const hash = bcrypt.hash(clave, 10)
    return hash
}

const compare = (passwordLogin, passwordEncrypt) => {
    const valida = bcrypt.compare(passwordLogin, passwordEncrypt)
    return valida
}

module.exports = {
    encrypt,
    compare
}