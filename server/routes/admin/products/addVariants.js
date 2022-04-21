const express = require("express");
const router = express.Router();
const knex = require("../../../utils/dbConfig");
const multer = require("multer");
const { insertVariant } = require("../../../queries/variants");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); //"/images" is  folder storage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname); //file.originalname has accesss to the file type
  },
});
const upload = multer({ storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .jpg .jpeg .png images are supported!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
 });

router.post("/", upload.array("file",3), (req, res) => {
  console.log("bodyyyyyyyyyyyyyyyyy",req.body)
  const reqFiles = [];
for (var i = 0; i < req.files.length; i++) {
       console.log("seeeeeeee",req.files[i].filename, req.files[i].path)
    }
  //console.log("FML",req.files)
  insertVariant(req.body)
    .returning("variants.id")
    .then((row) => {
      console.log("333",row)
      const multipleFiles = req.files.map(file => 
      ({ image_url: file.path, variant_id: row[0].id })); 
      knex("variant_images")
        .insert(multipleFiles)
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
});

router.post("/single", upload.single("variant_images"), (req, res) => {
  console.log("Request.file", req.file); //display info on image file
  res.send("Single File Upload Sucesss");
});

router.post("/multiple", upload.array("file", 3), (req, res) => {
  console.log("check",req.files);
  res.send("Multiple image upload sucess");
});

module.exports = router;