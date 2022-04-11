const request = require("supertest");
const router = require("../../routes/admin/categories/category");
const httpMocks = require("node-mocks-http");
const { addCategory, updateCategory, deleteCategory } = require("../../queries/category");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
let id = 112;
let name = 'Test Cat';
let parent_id = 1

describe("test category route", () => {
  test("should return 200 status code on creating category", async () => {
    const { body } = request(router).post("/add").send({
      categoryName: "New Cat",
      searchItemId: null,
    })
    expect(res.statusCode).toBe(200);
  });

  test("should return 200 status code on editing category", async () => {
    request(router).post("/update").send({
      categoryId: 4,
      categoryName: "Saree",
      searchItemId: 2,
    });
    expect(res.statusCode).toBe(200);
  });

  test("should return 200 status code on deleting category", async () => {
    request(router).delete("/delete").query({ id: 3 });
    expect(res.statusCode).toBe(200);
  });
});

xdescribe("addCategory", () => {
  it("should have a addCategory function", () => {
    expect(addCategory).toBeDefined();
  });

  it("should call addCategory function and return response 200, object", () => {
    addCategory({name, parent_id}).then((row) => {
      expect(row).toBeDefined();
      expect(res.statusCode).toBe(200);
      expect(typeof row).toBe("object");
    })
  });
});

xdescribe("updateCategory", () => {
  it("should have a updateCategory function", () => {
    expect(updateCategory).toBeDefined();
  });

  it("should call updateCategory function and return response 200, object", () => {
    updateCategory({id, name, parent_id}).then((row) => {
      expect(row).toBeDefined();
      expect(res.statusCode).toBe(200);
      expect(typeof row).toBe("object");
    })
  });
});

xdescribe("deleteCategory", () => {
  it("should have a deleteCategory function", () => {
    expect(deleteCategory).toBeDefined();
  });

  it("should call deleteCategory function and return response 200", () => {
    deleteCategory({id}).then((row) => {
      expect(row).toBeDefined();
      expect(res.statusCode).toBe(200);
    })
  });
});
