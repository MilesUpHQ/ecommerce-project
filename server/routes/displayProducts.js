const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("/",(req,res)=>{
    knex("products") 
    .select("name","description","price").then(row=>{
        console.log("Display here",row)
        res.json(row);
    })
    .catch((err) => {
        res.status(400).send("Unable to display products");
      })
})
module.exports = router;