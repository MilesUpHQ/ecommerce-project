exports.up = function (knex) {
  return (
    knex.schema
      .createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username").unique().notNullable();
        table.string("password_digest").notNullable();
        table.string("email").unique().notNullable();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.boolean("is_admin").defaultTo(false);
        table.string("avatar_url");
        table.timestamps(true, true);
      })
      .createTable("product_categories", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("description");
        table.integer("parent_id").unsigned();
        table.foreign("parent_id").references("product_categories.id");
        table.timestamps(true, true);
      })
      .createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("description");
        table.integer("category_id").unsigned().notNullable();
        table.foreign("category_id").references("product_categories.id");
        table.timestamps(true, true);
      })
      // .createTable("country", (table) => {
      //   table.increments("id").primary();
      //   table.string("name").notNullable();
      //   table.string("code").notNullable();
      //   table.timestamps(true, true);
      // })
      .createTable("address", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("phone").checkRegex("[0-9]{10}");
        table.string("street").notNullable();
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.string("pin_code").notNullable();
        table.string("country").unsigned().notNullable();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.timestamps(true, true);
      })
      .createTable("orders", (table) => {
        table.increments("id").primary();
        table.dateTime("order_date").notNullable();
        table.integer("total_price").notNullable();
        table.string("status").notNullable();
        table.integer("address_id").unsigned().notNullable();
        table.foreign("address_id").references("address.id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.timestamps(true, true);
      })
      .createTable("order_items", (table) => {
        table.increments("id").primary();
        table.integer("quantity").notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
        table.integer("order_id").unsigned().notNullable();
        table.foreign("order_id").references("orders.id");
        table.timestamps(true, true);
      })
      .createTable("cart", (table) => {
        table.increments("id").primary();
        table.float("price", 0.0);
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.timestamps(true, true);
      })
      .createTable("wishlist", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
        table.timestamps(true, true);
      })
      .createTable("reviews", (table) => {
        table.increments("id").primary();
        table.integer("rating").notNullable();
        table.string("comment").notNullable();
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.timestamps(true, true);
      })
      .createTable("payment", (table) => {
        table.increments("id").primary();
        table.string("type").notNullable();
        table.string("status").notNullable();
        table.integer("order_id").unsigned().notNullable();
        table.foreign("order_id").references("orders.id");
        table.timestamps(true, true);
      })
      .createTable("shipping", (table) => {
        table.increments("id").primary();
        table.string("type").notNullable();
        table.string("status").notNullable();
        table.integer("order_id").unsigned().notNullable();
        table.foreign("order_id").references("orders.id");
        table.timestamps(true, true);
      })
      .createTable("featured_products", (table) => {
        table.increments("id").primary();
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
        table.timestamps(true, true);
      })
      .createTable("variants", (table) => {
        table.increments("id").primary();
        table.string("size");
        table.string("color");
        table.string("type");
        table.float("price", 0.0);
        table.boolean("is_default", false);
        table.integer("product_id").unsigned().notNullable();
        table.foreign("product_id").references("products.id");
        table.timestamps(true, true);
      })
      .createTable("variant_images", (table) => {
        table.increments("id").primary();
        table.string("image_url").notNullable();
        table.integer("variant_id").unsigned().notNullable();
        table.foreign("variant_id").references("variants.id");
        table.timestamps(true, true);
      })
      .createTable("cart_items", (table) => {
        table.increments("id").primary();
        table.integer("quantity").notNullable();
        table.integer("variant_id").unsigned().notNullable();
        table.foreign("variant_id").references("variants.id");
        table.integer("cart_id").unsigned().notNullable();
        table.foreign("cart_id").references("cart.id");
        table.timestamps(true, true);
      })
  );
};

exports.down = function (knex) {
  return (
    knex.schema
      .dropTable("cart_items")
      .dropTable("variant_images")
      .dropTable("variants")
      .dropTable("featured_products")
      .dropTable("shipping")
      .dropTable("payment")
      .dropTable("reviews")
      .dropTable("wishlist")
      .dropTable("cart")
      .dropTable("order_items")
      .dropTable("orders")
      .dropTable("address")
      // .dropTable("country")
      .dropTable("products")
      .dropTable("product_categories")
      .dropTable("users")
  );
};
