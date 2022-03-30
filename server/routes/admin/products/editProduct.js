const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");
const multer = require("multer");
const db = require("../../../utils/dbConfig");

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
  const pid = req.body.id;
  const vid = req.body.variantId;
  knex("products")
    .where("id", pid)
    .update({
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category,
    })
    .returning("products.id")
    .then((row) => {
      knex("variants")
        .where("variants.id", vid)
        .update({
          size: req.body.size,
          color: req.body.color,
          type: req.body.type,
          price: req.body.price,
        })
        .returning("variants.id")
        .then((row) => {
          if (req.file) {
            knex("variant_images")
              .where("variant_images.id", vid)
              .update({
                image_url: req.file.path,
              })
              .then((row) => {
                res.json(row);
              })
              .catch((err) => {
                res.status(400).send("Unable to post image");
              });
          } else {
            res.json(row);
          }
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
