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
        UPDATE orders 
          SET total_price = (SELECT SUM(order_items.quantity * variants.price) FROM order_items
            INNER JOIN variants ON variants.id = order_items.variant_id
            INNER JOIN orders ON orders.id = order_items.order_id
            WHERE orders.id = OLD.order_id)
        WHERE orders.id = OLD.order_id;
        RETURN OLD;
      ELSE 
        UPDATE orders 
          SET total_price = (SELECT SUM(order_items.quantity * variants.price) FROM order_items
            INNER JOIN variants ON variants.id = order_items.variant_id
            INNER JOIN orders ON orders.id = order_items.order_id
            WHERE orders.id = NEW.order_id)
          WHERE orders.id = NEW.order_id;
          RETURN NEW;
      END IF;
    END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER cart_price_update_trigger
  AFTER INSERT OR UPDATE OR DELETE ON order_items
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
    DROP TRIGGER cart_price_update_trigger ON order_items;
    DROP FUNCTION update_cart_price();
  `);
};
