import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const singleUpload = upload.single('image');

export const uploadImageMiddleware = (req, res, next) => {
  // console.log(req);
  singleUpload(req, res, (error) => {
    console.log("Upload Midd " + req.file);
    if (error) {
      return res.status(422).send({ message: 'Image upload fail!' });
    }
    next();
  });
};
