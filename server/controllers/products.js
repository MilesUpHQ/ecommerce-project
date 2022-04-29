const knex = require("../utils/dbConfig");
const { insertProduct } = require("../queries/product");
const { insertVariant } = require("../queries/variants");

function addProduct(req, res) {
  insertProduct(req.body)
    .returning("products.id")
    .then((row) => {
      res.json({ id: row[0].id });
    })
    .catch((err) => {
      res.status(400).send("Unable to Post data ");
      console.log(err);
    });
}

function getCategories(req, res) {
  knex("product_categories")
    .select("product_categories.name", "product_categories.id")
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.send("Sorry couldn't load categories. Please refresh and try again ");
    });
}

function editProduct(req, res) {
  const pid = req.body.id;
  knex("products")
    .where("id", pid)
    .update({
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category,
    })
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editProductInfo(req, res) {
  knex("products")
    .leftJoin(
      "product_categories",
      "product_categories.id",
      "products.category_id"
    )
    .select(
      "product_categories.name as categoryname",
      "product_categories.id as categoryid",
      "products.id",
      "products.name",
      "products.description"
    )
    .where({ "products.id": req.params.id })
    .then((row) => {
      res.json(row[0]);
    })
    .catch((err) => {
      res.status(400).send("Unable to send products");
    });
}

function addVariant(req, res) {
  insertVariant(req.body)
    .returning("variants.id")
    .then((row) => {
      knex("variant_images")
        .insert({ image_url: req.file.path, variant_id: row[0].id })
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
}

function editVariantInfo(req, res) {
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
}

function editVariant(req, res) {
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
}

function deleteVariant(req, res) {
  knex("variant_images")
    .delete()
    .where("variant_id", req.query.variantid)
    .then((rows) => {
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
}

module.exports = {
  addProduct,
  addVariant,
  getCategories,
  editProduct,
  editProductInfo,
  editVariantInfo,
  editVariant,
  deleteVariant,
};
