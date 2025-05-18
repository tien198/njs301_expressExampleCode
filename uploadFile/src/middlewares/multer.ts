import multer, { type FileFilterCallback } from 'multer'
import type { Request } from 'express'

import fs from 'fs'
import path from 'path'

function diskStorage() {
    const nowTt = Date.now() // timestamp
    const dT = new Date(nowTt) // datetime

    return multer.diskStorage({
        destination(req, file, cb) {

            // organize folder according year/month/date/ to optimize image retrieve
            const filePath = path.join('public', String(dT.getFullYear()), String(dT.getMonth()), String(dT.getDate()))
            if (!fs.existsSync(filePath))
                fs.mkdirSync(filePath, { recursive: true })

            cb(null, filePath)
        },
        filename(req, file, cb) {
            cb(null, nowTt + '-' + file.originalname)
        }
    })
}


/// List of image mimetypes: https://www.iana.org/assignments/media-types/media-types.xhtml#image
const imgMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (imgMimeTypes.includes(file.mimetype))
        cb(null, true)
    else
        cb(null, false)
}

const multerMw = multer({
    storage: diskStorage(),
    fileFilter: fileFilter,
}).single('file')

export default multerMw
