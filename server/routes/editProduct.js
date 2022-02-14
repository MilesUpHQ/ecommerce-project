const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
const multer  = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination:(req,file,cb)=>{
    
    cb(null,"./images");//"/images" is  folder storage
  },
  filename: (req, file, cb)=>{
    cb(null,Date.now()+"--"+file.originalname)//file.originalname has accesss to the file type
  },
});
const upload = multer({storage:fileStorageEngine});

router.put("/", upload.single("file"),(req, res) => {
  console.log("rerdtr", req.body);
  console.log("img",req.file);
  console.log("id",req.body.id)
  console.log("vid",req.body.vid)
  knex("variants")
    .where("product_id", req.body.id)
    .update({
      size: req.body.size,
      color: req.body.color,
      type: req.body.type,
      price: req.body.price,
    })
    .returning("variants.id")
    .then((row) => {
      console.log("Insided", req.body.id);
      knex("products")
        .where("id", req.body.id)
        .update({
          name: req.body.name,
          description: req.body.description,
          category_id: req.body.categoryid,
        })
        .returning("products.id")
        .then((row) => {
          knex("variant_images")
          .where("variant_id",req.body.vid)
          .update({image_url:req.file.path})
          .returning("variant_images.id")
          .then(row=>{
          res.json(row);
          console.log("congratulations u made it");
        })
        .catch((err)=>{
          console.log("check",err);
          res.status(400).send("Unable to post image");
        })
        })
        .catch((err) => {
          res.status(400).send("Unable to Post data ");
        });
    })
    .catch((err) => {
      console.log(err);
      // res.status(400).send("Unable to Post data ");
    });
});

router.post("/single", upload.single("variant_images"),  (req, res)=> {
  console.log("Request.file",req.file);//display info on image file 
  res.send("Single File Upload Sucesss");
 });


 router.post("/multiple",upload.array("variant_images",3),
 (req,res)=>{
   console.log(req.files);
   res.send("Multiple image upload sucess");
 });   

module.exports = router;
