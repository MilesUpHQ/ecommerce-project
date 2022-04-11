/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.raw(`
    CREATE FUNCTION delete_product_dependencies()
    RETURNS TRIGGER AS $$
      BEGIN
          DELETE from variant_images WHERE variant_id in (SELECT id from variants WHERE product_id = OLD.id);  
          DELETE from featured_products WHERE product_id = OLD.id;
          DELETE FROM variants WHERE variants.product_id = OLD.id; 
          RETURN OLD;
      END;
    $$ LANGUAGE plpgsql;
  
    CREATE TRIGGER delete_product_trigger
    BEFORE  DELETE ON products
      FOR EACH ROW
      EXECUTE PROCEDURE delete_product_dependencies();
    `);
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw(`
    DROP TRIGGER delete_product_trigger ON products;
    DROP FUNCTION delete_product_dependencies();
  `);
  
};
