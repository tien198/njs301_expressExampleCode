import express from 'express'
import session from './middlewares/session.ts'
import Tokens from 'csrf'


const token =  new Tokens()






const app = express()






// session middleware
app.use(session)



app.get('/login', (req, res) => {
    req.session.userName = 'John Doe'
    // Guarentee tehat the session is saved before sending the response
    // or throw if Error
    req.session.save(err => {
        res.send(`Session data: ${JSON.stringify(req.session)}`)
    })
})

app.get('/session', (req, res) => {
    res.send(`Session data: ${JSON.stringify(req.session)}`)
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error destroying session')
        }
        res.send('Session destroyed')
    })
})


app.listen(3000, () => console.log('Server is running on http://localhost:3000/'))