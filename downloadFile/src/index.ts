import type { Request, Response, NextFunction } from 'express'

import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'


const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



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

/*
Em chào anh ạ!

Em đang học tới phần upload các file như .jpg, .png, .mp4 ..., và đang phân vân về các vị trí upload
Em xin hỏi trong các dự án lớn thì thường các file sẽ nên được lưu thế nào ạ:
- upload vào File System của server 
- thuê ngoài các dịch vụ lưu trữ như clouldflare, AWS S3, Google Cloud Storage, ...
- dùng 1 database khác rồi lưu file vào đó

Em thắc măc khi có quá nhiều hình ảnh, cần phải tối ưu tốc độ truy xuất ảnh, 
nếu lưu trong File System thì dù tổ chức thông minh kiểu gì thì vẫn cứ bị chậm và ko thể trực tiếp được như databasse,
em cũng chưa hiểu rõ lắm cách các dịch vụ lưu trữ thực hiện để tối ưu khi có truy vấn gửi đến để lấy ảnh.

Em có hỏi sơ chatGPT nhưng chưa nhận đc câu trả lời thỏa mãn

Em xin nhờ anh giảng giải. Em cảm ơn anh nhiều ạ!
*/