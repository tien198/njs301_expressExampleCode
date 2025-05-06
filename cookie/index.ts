import express from 'express'

const app = express()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.get('/', (req, res) => {
    res.setHeader('set-cookie', 'name=value; HttpOnly; Secure; SameSite=Strict')
    res.send('cookies setted !')
})

app.get('/test-cookie', (req, res) => {
    const cookie = req.headers.cookie?.split('; ')[0].trim()
    if (cookie) {
        res.send(`Cookie: ${cookie}`)
    } else {
        res.send('No cookie found')
    }
})

