import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

config();

//configurazione cloudinary:
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUD, 
    api_secret: process.env.API_SECRET_CLOUD,
});

//file consentiti: 
const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//dimensione max:
const maxSize = 1 * 1024 * 1024;

//PER AUTHOR ROUTE:
const authorStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatar'
  },
});
  
//PER POST ROUTE:
const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
      folder: 'cover'
  },
});

//controllo size e type:
const fileFilter = (req, file, cb) => {
  if(!allowedTypes.includes(file.mimetype)) {
    const error = new Error(`Invalid file type. Try to upload: ${allowedTypes}. Max size: ${maxSize}`);
    error.code = "INVALID_FILE_TYPE";
    return cb(error, false);
  }
  cb(null, true);
}
  
const authorUpload = multer({
   storage: authorStorage,
   fileFilter: fileFilter,
   limits: {
    fileSize: maxSize
   }  
}).single('avatar');

const postUpload = multer({ 
  storage: postStorage,
  fileFilter: fileFilter,
  limits: {
      fileSize: maxSize
  }
}).single('cover');

export { authorUpload, postUpload };
