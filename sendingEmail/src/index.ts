import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'


const app = express()


app.use(express.json())



const transporter = nodemailer.createTransport({
    auth: {
        user: 'fawals98@gmail.com',
        pass: process.env.GOOGLE_APP_PASSWORD
    },
    // service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true
})



app.post('/send-mail', async (req, res, next) => {
    try {
        const { to, from, subject, html } = req.body

        const mainSender = 'Cty vô trách nhiệm vô thời hạn ABC '
        const sentMsgInfor = await transporter.sendMail({
            to, subject, html,
            from: mainSender + from
        })

        res.send(sentMsgInfor)
    } catch (error) {
        next(error)
    }
})




app.listen(3000, () => console.log('Server is running on http://localhost:3000/'))