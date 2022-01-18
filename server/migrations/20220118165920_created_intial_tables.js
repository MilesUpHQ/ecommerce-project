
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('username').unique().notNullable();
        table.string('password_digest').notNullable();
        table.string('email').unique().notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.boolean('is_admin').defaultTo(false);
        table.string('avatar_url');
        table.timestamps(true, true);
    })
    .createTable('ProductCategories', (table) => {
        table.increments('categories_id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.timestamps(true, true);
    })
    .createTable('SubCategory',(table) => {
        table.increments('sub_category_id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.integer('parent_id').unsigned().notNullable();
        table.foreign('parent_id').references('ProductCategories.categories_id');
        table.timestamps(true, true);   
    })
    .createTable('Products', (table) => {
        table.increments('products_id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.string('image_url');
        table.integer('price').notNullable();
        table.integer('category_id').unsigned().notNullable();
        table.foreign('category_id').references('ProductCategories.categories_id');
        table.integer('sub_category_id').unsigned().notNullable();
        table.foreign('sub_category_id').references('SubCategory.sub_category_id');
        table.timestamps(true, true);
    })
    .createTable('Orders', (table) => {
        table.increments('orders_id').primary();
        table.dateTime('order_date').notNullable();
        table.integer('total_price').notNullable();
        table.string('status').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.user_id');
        table.timestamps(true, true);
    })
    .createTable('OrderItems', (table) => {
        table.increments('order_items_id').primary();
        table.integer('quantity').notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('Products.products_id');
        table.integer('order_id').unsigned().notNullable();
        table.foreign('order_id').references('Orders.orders_id');
        table.timestamps(true, true);
    })
    .createTable('Cart', (table) => {
        table.increments('cart_id').primary();
        table.integer('quantity').notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('Products.products_id');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.user_id');
        table.timestamps(true, true);
    })
    .createTable('Wishlist',(table) => {
        table.increments('wishlist_id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.user_id');
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('Products.products_id');
        table.timestamps(true, true);
    })
    .createTable('Reviews', (table) => {
        table.increments('reviews_id').primary();
        table.integer('rating').notNullable();
        table.string('comment').notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('Products.products_id');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.user_id');
        table.timestamps(true, true);
    })
    .createTable('Payment',(table) => {
        table.increments('payment_id').primary();
        table.string('type').notNullable();
        table.string('Status').notNullable();
        table.integer('order_id').unsigned().notNullable();
        table.foreign('order_id').references('Orders.orders_id');
        table.timestamps(true, true);
    })
    .createTable('Shipping',(table) => {
        table.increments('shipping_id').primary();
        table.string('type').notNullable();
        table.string('status').notNullable();
        table.integer('order_id').unsigned().notNullable();
        table.foreign('order_id').references('Orders.orders_id');
        table.timestamps(true, true);
    })
    .createTable('FeturedProducts',(table) => {
        table.increments('featured_id').primary();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('Products.products_id');
        table.timestamps(true, true);
    })
    .createTable('Address',(table) => {
        table.increments('address_id').primary();
        table.string('street').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('pin').notNullable();
        table.string('country').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.user_id');
        table.timestamps(true, true);
    })
    .createTable('Varients',(table) => {
        table.increments('varients_id').primary();
        table.string('size').notNullable();
        table.string('color').notNullable();
        table.string('type').notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('product_id').references('Products.products_id');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('Varients')
    .dropTable('Address')
    .dropTable('FeturedProducts')
    .dropTable('Shipping')
    .dropTable('Payment')
    .dropTable('Reviews')
    .dropTable('Wishlist')
    .dropTable('Cart')
    .dropTable('OrderItems')
    .dropTable('Orders')
    .dropTable('Products')
    .dropTable('SubCategory')
    .dropTable('ProductCategories')
    .dropTable('users');
};
