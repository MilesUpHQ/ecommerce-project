const fs = require("fs");
const _ = require("lodash");
const { faker } = require("@faker-js/faker");
const db = require("./utils/dbConfig");

const p = faker.commerce.productName();

let categories;

const createUser = async () => {
  await db("users").del();
  return db("users")
    .insert([
      {
        password_digest:
          "$2b$10$lAMrAwkM74uWYzDHA9PXxeMuov5CPo58qNN2B/na4MvmCWEut2LgW",
        email: "magesh@gmail.com",
        first_name: "Magesh",
        last_name: "S",
        is_admin: true,
        username: faker.internet.userName(),
      },
    ])
    .returning("id");
};
const downloadImage = (dest) => {
  const url = faker.image.fashion();
  const options = {};
  return new Promise((resolve, reject) => {
    const request = url.trim().startsWith("https")
      ? require("https")
      : require("http");

    request
      .get(url, options, (res) => {
        if (res.statusCode !== 200) {
          // Consume response data to free up memory
          res.resume();
          reject(
            new Error("Request Failed.\n" + `Status Code: ${res.statusCode}`)
          );

          return;
        }

        res
          .pipe(fs.createWriteStream(dest))
          .on("error", reject)
          .once("close", () => resolve({ filename: dest }));
      })
      .on("timeout", () => reject(new TimeoutError()))
      .on("error", reject);
  });
};

const createProduct = () => {
  return db("products")
    .insert([
      {
        name: faker.commerce.productName(),
        category_id: _.shuffle(categories)[0],
        description: faker.commerce.productDescription(),
      },
    ])
    .returning(["id", "name"]);
};

const createVariant = (product) => {
  return db("variants")
    .insert({
      product_id: product.id,
      color: faker.commerce.color(),
      size: faker.random.alpha({ upcase: true }),
      price: faker.commerce.price(),
      type: "sdf",
    })
    .returning("id");
};

const createVariantImage = async (variant, productName) => {
  console.log(productName);
  const image = await downloadImage("images/" + productName);
  console.log("image", image);
  return db("variant_images").insert([
    {
      variant_id: variant.id,
      image_url: image.filename,
    },
  ]);
};

const createSlug = (str) => {
  return str
    .replace(/[^a-zA-Z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
};

async function getCategories() {
  categories = await db("product_categories")
    .pluck("id")
    .whereNot("parent_id", null);
  console.log(categories);

  for (let i = 0; i <= 20; i++) {
    createProduct().then(async (product) => {
      let variant = await createVariant(product[0]);
      console.log(product[0]);
      createVariantImage(variant[0], createSlug(product[0].name)).then(
        async (res) => {
          const product_ids = await db("products").pluck("id");
          product_ids.map((id) => {
            return db("featured_products")
              .insert([{ product_id: id }])
              .then((featured) => {
                // console.log("Featured products", featured);
              });
          });
        }
      );
    });
  }
  console.log(p);
}
createUser().then((user) => {
  console.log("User magesh created");
  db("address")
    .insert([
      {
        name: "Magesh",
        email: "magesh@gmail.com",
        phone: faker.phone.phoneNumber("991#######"),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        pin_code: faker.address.zipCode(),
        country: faker.address.countryCode(),
        user_id: user[0].id,
      },
    ])
    .then(() => console.log("first"));
});
getCategories();
// downloadImage("images/magesh.png")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
