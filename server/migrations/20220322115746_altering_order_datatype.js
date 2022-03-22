/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("orders", function (table) {
      table.dropColumn("payment_gateway_id");
    })
    .alterTable("orders", function (table) {
      table.string("payment_gateway_id");
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
    })
    .alterTable("orders", function (table) {
      table.integer("payment_gateway_id").unsigned();
    });
};
