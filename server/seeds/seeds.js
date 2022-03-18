/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries

  // knex("users")
  //   .del()
  //   .then(function () {
  //     return knex("users").insert([
  //     {id}
  //   ])
  // })

  return knex("product_categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("product_categories").insert([
        { id: 1, name: "Men" },
        { id: 2, name: "Women" },
        { id: 3, name: "Shirts", parent_id: 1 },
        { id: 4, name: "Saree", parent_id: 2 },
        { id: 5, name: "Pants", parent_id: 1 },
        { id: 6, name: "Kurtas", parent_id: 2 },
      ]);
    });
};
