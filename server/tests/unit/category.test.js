const request = require("supertest");
const { deleteCategory } = require("../../queries/category");
const router = require("../../routes/admin/categories/category");
const httpMocks = require("node-mocks-http");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
let id = 1;
describe("test category route", () => {
  test("should return 200 status code on creating category", async () => {
    request(router)
      .post("/add")
      .send({
        categoryName: "New Cat",
        searchItemId: 0,
      })
      .expect(200);
  })

  test('should return 200 status code on deleting category', async() => {
      request(router)
      .delete('/delete')
      .query({ category_id: id }).expect(200)
  })
});

