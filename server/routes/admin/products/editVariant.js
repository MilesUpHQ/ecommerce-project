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

router.get("/:id", (req, res) => {
  knex("variants")
    .leftJoin("variant_images", "variants.id", "variant_images.variant_id")
    .select(
      "variants.size",
      "variants.color",
      "variants.type",
      "variants.price",
      "variants.id",
      "variants.product_id as pid",
      "variant_images.image_url"
    )
    .where({ "variants.id": req.params.id })
    .then((row) => {
      console.log("hbh", row);
      res.json(row[0]);
    })
    .catch((err) => {
      res.status(400).send("Unable to send products");
    });
});

router.put("/",upload.single("file"), (req, res) => {
  knex("variants")
    .where("variants.id", req.body.variantId)
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
          .where("variant_images.variant_id", req.body.variantId)
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
      res.status(400).send("Unable to update variant");
    });
});

router.delete("/", (req, res) => {
     knex("variant_images")
     .delete()
     .where("variant_id", req.query.variantid)
     .then((rows)=>{
      knex("variants")
      .delete()
      .where("id", req.query.variantid)
      .then((rows) => {
        res.status(200).json(rows);
        return rows[0];
     })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
