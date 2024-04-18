import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const singleUpload = upload.single('image');

export const uploadProfile = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return res.status(422).send({ message: 'Image upload fail!' });
    }
    next();
  });
};
