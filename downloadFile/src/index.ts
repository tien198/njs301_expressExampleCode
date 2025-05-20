import type { Request, Response, NextFunction } from 'express'

import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'


const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// using .send()
// pass fileId param to specify what file to download
app.get('/download-file/:fileName', (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params['fileName']
    const filePath = path.join(__dirname, '..', 'datas', fileName)

    if (!fs.existsSync(filePath)) {
        res.status(404).send('File not found')
        return
    }

    const file = fs.readFileSync(filePath)

    res.setHeader('content-type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename:"' + fileName + '"')
    // IMPORTANT! Use .send() to send file
    res.send(file)
})


// using Stream
app.get('/open-file/:fileName', (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params['fileName']
    const filePath = path.join(__dirname, '..', 'datas', fileName)

    if (!fs.existsSync(filePath)) {
        res.status(404).send('File not found')
        return
    }

    res.setHeader('content-disposition', 'attachment')

    // createReadStream to read file data in chunk, advoid load entire file into memory
    // => mitigate the used memory totals
    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)
})



app.listen(3000, () => console.log('Server is running on http://localhost:3000/'))
