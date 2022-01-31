const express = require("express");
const router = express.Router();
const knex = require("../utils/dbConfig");

router.get("",(req,res)=>{
    knex("products") 
    .select("name","description","price").then(row=>{
        console.log("Display here",row)
        res.json(row);
    })
    .catch((err) => {
        console.log("err :::::::::::::::", err);
      })
})
module.exports = router;