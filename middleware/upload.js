import path from "path";
import multer from "multer";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  // fileFilter: function (req, file, callback) {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
  //     callback(null, true);
  //   } else {
  //     console.log("only jpg and png files supported");
  //     callback(null, false);
  //   }
  // },
});

export default upload;
