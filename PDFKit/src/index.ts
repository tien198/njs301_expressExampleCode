import type { Request, Response, NextFunction } from 'express'

import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import PDFDocument from 'pdfkit'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.get('/create-pdf', (req: Request, res: Response, next: NextFunction) => {
    // docData simulate the input data to create PDF
    const docData = {
        fileName: 'documen.pdf',
        title: 'Doc',
        contents: 'The content of file'
    }


    const destDir = path.join(__dirname, '..', 'datas')

    if (!fs.existsSync(destDir))
        fs.mkdirSync(destDir)

    const destPath = path.join(destDir, docData.fileName)

    const pdfDoc = new PDFDocument()

    // content of PDF
    pdfDoc.fontSize(26).text(docData.title, { underline: true, align: 'center' })
    pdfDoc.fontSize(12)
    pdfDoc.text(docData.contents)

    // set pipe to fs
    pdfDoc.pipe(fs.createWriteStream(destPath))
    // set pipe to response
    pdfDoc.pipe(res)

    res.setHeader('content-type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename:"' + docData.fileName + '"')



    pdfDoc.end()
})


// using Stream
app.get('/open-file/:fileName', (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params['fileName']
    const destDir = path.join(__dirname, '..', 'datas', fileName)

    if (!fs.existsSync(destDir)) {
        res.status(404).send('File not found')
        return
    }

    res.setHeader('content-disposition', 'attachment')

    // createReadStream to read file data in chunk, advoid load entire file into memory
    // => mitigate the used memory totals
    const fileStream = fs.createReadStream(destDir)
    fileStream.pipe(res)
})



app.listen(3000, () => console.log('Server is running on http://localhost:3000/'))
