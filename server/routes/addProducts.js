const express = require("express");
const router = express.Router();
const knex = require("../utils/knex");
const multer  = require('multer');
//const cors = require("cors");
//const upload = multer({ dest: 'uploads/' })
//const fileUpload = require('express-fileupload');
/*return knex("users")
  .insert({ first_name: "John", last_name: "Doe" })
  .returning('id')
  .then(function (response) {
    return knex('groups')
      .insert({name: 'Cool Group', user_id: response[0]})
  });*/
 // router.use(cors());



  const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"./images");//"/images" is  folder storage
    },
    filename: (req, file, cb)=>{
      cb(null,Date.now()+"--"+file.originalname)//file.originalname has accesss to the file type
    },
  });
  const upload = multer({storage:fileStorageEngine});

router.post("",(req,res)=>{
    console.log("Request.body",req);
      //  table.integer('category_id').unsigned().notNullable();
    knex("products").insert({ name:req.body.name, price: req.body.price,description:req.body.description , category_id:null })
    //.returning('id')
    .then(row => {
      router.post("/single", upload.single("image"),  (req, res)=> {
       console.log("Request.file",req.file);//display info on image file 
       res.send("Single File Upload Sucesss");
      });


      router.post("/multiple",upload.array("images",3),
      (req,res)=>{
        console.log(req.files);
        res.send("Multiple image upload sucess");
      });   
      //console.log("::::::::::::",req.body.row[0].id)
      //return knex.insert({image_url:req.body.img,product_id:req.body.row[0].id}).into('product_images');
       // const {name,data} = req.files.img;
        //const tagsInsert = tags.map(tagId => ({ note_id: noteId, tag_id: tagId }));
        //console.log(row[0])
       // knex("product_images")
       /*if(name&&data){
         knex("product_images").insert({product_id:row[0].id,image_url:data})
        .then
        res.sendStatus(200);
       }
       else
       res.sendStatus(400);*/
     // res.json(row);
    }).catch((err) => {
      console.log("err :::::::::::::::", err);
    })
})
router.get("",(req,res)=>{
    knex("products") 
    .select("id","name").then(row=>{
        console.log(row)
        res.json(row);
    })
    .catch((err) => {
        console.log("err :::::::::::::::", err);
      })
})
module.exports = router;