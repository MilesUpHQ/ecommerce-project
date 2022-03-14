/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw(
      ` 
        DROP TRIGGER cart_price_update_trigger ON cart_items;
        DROP FUNCTION update_cart_price();
      `
    )
    .dropTable("cart_items")
    .dropTable("cart")
    .alterTable("orders", (table) => {
      table.dropColumn("total_price");
    })
    .alterTable("orders", (table) => {
      table.float("total_price", 0.0);
    })
    .alterTable("order_items", (table) => {
      table.integer("variant_id").unsigned().references("variants.id");
    })
    .alterTable("order_items", (table) => {
      table.dropColumn("product_id");
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
    })
    .raw(
      `
        CREATE FUNCTION update_cart_price()
        RETURNS TRIGGER AS $$
          BEGIN
            IF (TG_OP = 'DELETE') THEN
              UPDATE cart 
                SET price = (SELECT SUM(cart_items.quantity * variants.price) FROM cart_items
                  INNER JOIN variants ON variants.id = cart_items.variant_id
                  INNER JOIN cart ON cart.id = cart_items.cart_id
                  WHERE cart.id = OLD.cart_id)
              WHERE cart.id = OLD.cart_id;
              RETURN OLD;
            ELSE 
              UPDATE cart 
                SET price = (SELECT SUM(cart_items.quantity * variants.price) FROM cart_items
                  INNER JOIN variants ON variants.id = cart_items.variant_id
                  INNER JOIN cart ON cart.id = cart_items.cart_id
                  WHERE cart.id = NEW.cart_id)
                WHERE cart.id = NEW.cart_id;
                RETURN NEW;
            END IF;
          END;
        $$ LANGUAGE plpgsql;
      
        CREATE TRIGGER cart_price_update_trigger
        AFTER INSERT OR UPDATE OR DELETE ON cart_items
          FOR EACH ROW
          EXECUTE PROCEDURE update_cart_price();
    `
    )
    .alterTable("orders", (table) => {
      table.dropColumn("total_price");
    })
    .alterTable("orders", (table) => {
      table.integer("total_price").notNullable();
    })
    .alterTable("order_items", (table) => {
      table.dropColumn("variant_id");
    })
    .alterTable("order_items", (table) => {
      table.integer("product_id").unsigned().references("products.id");
    });
};
