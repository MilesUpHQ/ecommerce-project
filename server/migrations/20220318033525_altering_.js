/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("wishlist", (table) => {
    table.dropColumn("product_id");
    table.integer("variant_id").unsigned().notNullable();
    table.foreign("variant_id").references("variants.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("wishlist", (table) => {
    table.dropColumn("variant_id");
    table.integer("product_id").unsigned().notNullable();
    table.foreign("product_id").references("products.id");
  });
};
