import type { Request, Response, NextFunction } from 'express'

import express from 'express'
import multerMw from './middlewares/multer.ts'

const app = express()



app.use(multerMw)


// req.body = { file: Binary, title: string }
app.post('/upload-file', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file)
    // console.log(req.body.title)
    
    if (!req.file) {
        res.status(422).json('please submit image with extensions: .jpeg/jpg | .png | .webp | .svg/svgz')
        return
    }

    /// store filePath below in database as imgUrl
    const filePath = req.file.path
    res.status(200).json(req.body)
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