const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  editVariant,
  editVariantInfo,
  deleteVariant,
} = require("../../../controllers/products");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); //"/images" is  folder storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname); //file.originalname has accesss to the file type
  },
});
const upload = multer({ storage: fileStorageEngine });

router.get("/:id", editVariantInfo);
router.put("/", upload.single("file"), editVariant);
router.delete("/", deleteVariant);

module.exports = router;
