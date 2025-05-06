require('dotenv').config()
const express = require('express')
const { log, error } = require('console')

const { generateJwt, verifyJWT } = require('./utils/jwtGen')

const userData = require('./data/user')

const app = express()

app.use(express.json())

app.post('/login', (req, res, next) => {
    const { username, password } = req.body
    const user = userData.find(i => i.username === username)
    if (user && user.password === password) {
        const jwt = generateJwt(user)
        return res.status(202).send('Bearer ' + jwt)
    }
    req.user = user
    return res.status(401).send('Unauthorize!')
})

app.use((req, res, next) => {
    const token = req.headers.authorization
    verifyJWT(token)
        .then(user => {
            user && next()
        })
        .catch(err => {
            error(err)
            res.status(401).send('Unauthorize!')
        })
})

app.get('/protect', (req, res, next) => {
    res.json({ message: "Bạn đã truy cập vào API bảo vệ!", user: req.user });
})

app.listen(5000)

log(process.env.JWT_SECRET)


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDI4ODkyNjMsImV4cCI6MTc0Mjg5Mjg2M30.3p_Adnvx7EIVdMA1_N_qwCV9DSI7p3n-cIX6Pk5iBmU'
log(token.split('.'))