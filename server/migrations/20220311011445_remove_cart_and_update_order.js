/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .dropTable("cart_items")
    .dropTable("cart")
    .alterTable("orders", (table) => {
      table.dropColumn("total_price");
    })
    .alterTable("orders", (table) => {
      table.float("total_price", 0.0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .createTable("cart", (table) => {
      table.increments("id").primary();
      table.float("price", 0.0);
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
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
    });
};
