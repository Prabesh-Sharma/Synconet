import multer from 'multer'

import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const upload = multer({ dest: path.join(__dirname, '../../uploads') })
export default upload
