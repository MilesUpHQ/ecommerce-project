const { faker } = require("@faker-js/faker");
const db = require("./utils/dbConfig");
const _ = require("lodash");
const { upperCase } = require("lodash");

const p = faker.commerce.productName();

let categories;
async function getCategories() {
  categories = await db("product_categories")
    .pluck("id")
    .whereNot("parent_id", null);
  console.log(categories);

  let products;
  for (let i = 0; i <= 20; i++) {
    db("products")
      .insert([
        {
          name: faker.commerce.productName(),
          category_id: _.shuffle(categories)[0],
          description: faker.commerce.productDescription(),

          // image: faker.image(),
        },
      ])
      .returning("id")
      .then(async (result) => {
        // console.log("result", result);
        let variant = await db("variants")
          .insert({
            product_id: result[0].id,
            color: faker.commerce.color(),
            size: faker.random.alpha({ upcase: true }),
            price: faker.commerce.price(),
            type: "sdf",
          })
          .returning("id");
        console.log(variant);
        db("variant_images")
          .insert([
            {
              variant_id: variant[0].id,
              image_url: faker.image.fashion(),
            },
          ])
          .then((done) => {
            console.log(done);
          });
      });
  }
  console.log(p);
}
getCategories();
