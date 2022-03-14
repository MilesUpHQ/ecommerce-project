/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
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
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    DROP TRIGGER cart_price_update_trigger ON cart_items;
    DROP FUNCTION update_cart_price();
  `);
};
