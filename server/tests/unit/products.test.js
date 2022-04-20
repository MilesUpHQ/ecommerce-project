const httpMocks = require("node-mocks-http");
const {
  addProduct,
  addVariant,
  editProduct,
  editVariant,
} = require("../../controllers/products");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

const category = 1;
const name = "Roadster Shirtsss";
const description = "Anything";
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
      price: 1500,
      size: "M",
      color: "WHITE",
      type: "SDKJF",
      variantId: 1,
      productId: 1,
    };

    req.file = {
      fieldname: "file",
      originalname: "rohtang-pass-4.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      destination: "./images",
      filename: "1650453223929--rohtang-pass-4.jpg",
      path: "images/1650453223929--rohtang-pass-4.jpg",
      size: 32163,
    };

    await editVariant(req, res);
    expect(res.statusCode);
  });
});
