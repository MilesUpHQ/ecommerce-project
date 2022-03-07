const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");
const multer = require("multer");
const { updateVariant } = require("../../../queries/variants");
const { updateProduct } = require("../../../queries/product");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); //"/images" is  folder storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname); //file.originalname has accesss to the file type
  },
});
const upload = multer({ storage: fileStorageEngine });

router.put("/", upload.single("file"), (req, res) => {
  updateVariant(req.body)
    .returning("variants.id")
    .then((row) => {
      updateProduct(req.body)
        .returning("products.id")
        .then((row) => {
          knex("variant_images")
            .where("variant_id", req.body.variantId)
            .update({ image_url: req.file.path })
            .then((row) => {
              res.json(row);
            })
            .catch((err) => {
              res.status(400).send("Unable to post image");
            });
        })
        .catch((err) => {
          res.status(400).send("Unable to Post data ");
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/single", upload.single("variant_images"), (req, res) => {
  console.log("Request.file", req.file); //display info on image file
  res.send("Single File Upload Sucesss");
});

router.post("/multiple", upload.array("variant_images", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple image upload sucess");
});

module.exports = router;
