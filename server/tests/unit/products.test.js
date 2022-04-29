const httpMocks = require("node-mocks-http");
const {
  addProduct,
  addVariant,
  editProduct,
  editVariant,
} = require("../../controllers/products");
const { faker } = require("@faker-js/faker");
const request = require("supertest");
const router = require("../../server");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

const category = 1;
const name = faker.commerce.product();
const description = faker.commerce.productDescription();
const id = 1;

describe("addProduct controller ", () => {
  it("should be a function", () => {
    expect(addProduct).toBeInstanceOf(Function);
  });
});

describe("editProduct controller ", () => {
  it("should be a function", () => {
    expect(editProduct).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.body = {
      category: category,
      id: id,
      description: description,
      name: name,
    };

    await editProduct(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("editVariant controller", () => {
  it("should be a function", () => {
    expect(editVariant).toBeInstanceOf(Function);
  });
  it("should return 200 status code", async () => {
    req.body = {
      price: faker.commerce.price(),
      size: "M",
      color: faker.commerce.color(),
      type: "SDKJF",
      variantId: 1,
      productId: id,
    };

    req.file = { path: faker.image.image() };
    await editVariant(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("editVariant", () => {
  it("should return 400 for invalid price datatype", async () => {
    const res = await request(router).put("/api/admin/product/variant/edit").send({
      price: 'kjsdhfkjsdhfsjdf',
      size: "M",
      color: faker.commerce.color(),
      type: "SDKJF",
      variantId: 1,
      productId: id,
    })
    expect(res.statusCode).toBe(400)
  });

  it("should return 400 for invalid variant datatype", async () => {
    const res = await request(router).put("/api/admin/product/variant/edit").send({
      price: faker.commerce.price(),
      size: "M",
      color: faker.commerce.color(),
      type: faker.lorem.sentence(30),
      variantId: 'LKSHFKJSDHFKF',
      productId: 1 
    })
    expect(res.statusCode).toBe(400)
  });
});
