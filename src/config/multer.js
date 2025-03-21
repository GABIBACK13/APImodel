import multer from "multer";
import {extname, resolve} from 'path';

const random = () => Math.floor(Math.random() * 1000 + 1000);

export default {
  fileFilter : (req, file, cb) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo Precisa ser do tipo jpeg ou png'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`)
    },
  }),
};