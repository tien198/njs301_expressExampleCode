import type { Request, Response, NextFunction } from 'express'

import express from 'express'
import multer from 'multer'

const app = express()


app.use(express.json())

// app.use(express.mu)


app.post('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    res.status(200).json(req.body)
})



app.listen(3000, () => console.log('Server is running on http://localhost:3000/'))