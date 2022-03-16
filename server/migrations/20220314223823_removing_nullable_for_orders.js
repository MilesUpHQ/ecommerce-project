/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("orders", function (table) {
      table.dropColumn("order_id");
      table.dropColumn("address_id");
      table.dropColumn("order_date");
    })
    .alterTable("orders", function (table) {
      table.integer("payment_gateway_id").unsigned();
      table.integer("address_id").unsigned().references("address.id");
      table.timestamp("order_date");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("orders", function (table) {
      table.dropColumn("payment_gateway_id");
      table.dropColumn("address_id");
      table.dropColumn("order_date");
    })
    .alterTable("orders", function (table) {
      table.integer("order_id").unsigned();
      table.integer("address_id").unsigned();
      table.timestamp("order_date");
    });
};
