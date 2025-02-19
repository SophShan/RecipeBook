import multer from "multer";

const storage = multer.memoryStorage(); // store the image in memory as buffer instead of another type

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("File type not supported"));
    }
  },
});

export default upload;
