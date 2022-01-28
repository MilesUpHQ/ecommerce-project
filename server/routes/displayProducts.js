const express = require("express");
const router = express.Router();
const knex = require("../utils/knex");

router.get("",(req,res)=>{
    knex("products") 
    .select("name","description","price").then(row=>{
        console.log(row)
        res.json(row);
    })
    .catch((err) => {
        console.log("err :::::::::::::::", err);
      })
})
module.exports = router;