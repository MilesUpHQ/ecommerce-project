const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");
const multer  = require('multer');

router.get("",(req,res)=>{
  let categories;
  knex("product_categories")
    .select("product_categories.name","product_categories.id")
    .then((row) => {
      console.log("Result::::",row);
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
      res.send("coulnt get ");
    });
})


  const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
      
      cb(null,"./images");//"/images" is  folder storage
    },
    filename: (req, file, cb)=>{
      cb(null,Date.now()+"--"+file.originalname)//file.originalname has accesss to the file type
    },
  });
  const upload = multer({storage:fileStorageEngine});

router.post("/",upload.single("file"),(req,res)=>{
    console.log("Request.body",req);
    knex("products").insert({ name:req.body.name, price: req.body.price,description:req.body.description , category_id:req.body.category_id })
   .returning("products.id")
    .then(row => {
      console.log("Insided",row);
        knex("variants").insert({size:req.body.size,color:req.body.color,type:req.body.type,product_id:row[0].id})  
       .returning("variants.id")
        .then(row =>{
          res.json(row);
          console.log("congratulations u made it")
        })
        .catch((err)=>{
          console.log(err)
         // res.send("Failed stupid ");
        })
    }).catch((err) => {
      console.log(err)
     // res.status(400).send("Unable to Post data ");
    })
})

router.post("/single", upload.single("variant_images"),  (req, res)=> {
  console.log("Request.file",req.file);//display info on image file 
  res.send("Single File Upload Sucesss");
 });


 router.post("/multiple",upload.array("variant_images",3),
 (req,res)=>{
   console.log(req.files);
   res.send("Multiple image upload sucess");
 });   





router.get("/",(req,res)=>{
    knex("products") 
    .select("id","name").then(row=>{
        res.json(row);
    })
    .catch((err) => {
      res.status(400).send("Unable to get datas");
      })
})
module.exports = router;