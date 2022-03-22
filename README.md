# ecommerce-project

This repository contains a complete ecommerce project built with React, Node, Express, Knex, and PostgreSQL. It is a great starting point for anyone looking to build a ecommerce application.

## How its built

This project features a robust ecommerce backend built with Express and Knex. It also includes a front-end built with React.

- The front-end is built with React and React Router.
- The backend is built with Node, Express, Knex, and PostgreSQL.
- The project backend is deployed to Heroku.
- The project front-end is deployed to Netlify.

## Features

- Login/Register
- Home page with a search bar and a list of products.
- Products by category
- Product Listing
- Product Filtering
- Product Details
- Cart
- Checkout
- Payment
- Order History
- Admin Dashboard

## Getting started

To get started, clone this repository and install the dependencies:

```
git clone https://github.com/MilesUpHQ/ecommerce-project.git
cd ecommerce-project/client
npm install
npm start
```

### Open anoter terminal and Setup the server by running `npm install` in the `server` directory.

```
cd ecommerce-project/server
npm install
```

### Setup a database and run migrations:

Add database credentials to `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=ecommerce
```

Run Knex Migrations:

```
npm install knex -g
knex migrate:latest
```

See `.env.example` file and add other credentials to `.env` file.

### Now run the following command to start the server:

```
npm start
```

The app will be running on http://localhost:3000

To access the admin interface, go to: http://localhost:3000/admin

### To load data like, categories, products, featured_products, user, variants and variant_images

```bash
# After migration files are executed
knex seed:run
node play.js
```
