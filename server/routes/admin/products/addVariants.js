const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");
const multer = require("multer");
const { insertVariant } = require("../../../queries/variants");
//const { insertProduct } = require("../../../queries/product");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); //"/images" is  folder storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname); //file.originalname has accesss to the file type
  },
});
const upload = multer({ storage: fileStorageEngine });

router.post("/", upload.single("file"), (req, res) => {
  console.log("ss", req.body);
  insertVariant(req.body)
    .returning("variants.id")
    .then((row) => {
      console.log("vv", row);
      knex("variant_images")
        .insert({ image_url: req.file.path, variant_id: row[0].id })
        .then((row) => {
          res.json(row);
          console.log("congratulations u made it");
        })
        .catch((err) => {
          res.status(400).send("Unable to post image");
        });
    })
    .catch((err) => {
      res.status(400).send("Unable to Post data ");
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
