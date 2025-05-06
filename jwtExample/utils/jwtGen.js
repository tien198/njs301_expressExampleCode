const { error, log } = require('console')
const jwt = require('jsonwebtoken')

const JWT_SECRETKEY = 'mysecretkey'

exports.generateJwt = function (user) {
    const { id, username, role } = user
    return jwt.sign(
        { userId: id, username, role },
        // process.env.JWT_SECRET,
        JWT_SECRETKEY,
        { expiresIn: "1h" }
    )
}

exports.verifyJWT = function (jwtToken) {
    const token = jwtToken.split(' ')[1]
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            JWT_SECRETKEY,
            (err, decoded) => {
                if (err)
                    reject(err)
                resolve(decoded)
            }
        )
    })

}