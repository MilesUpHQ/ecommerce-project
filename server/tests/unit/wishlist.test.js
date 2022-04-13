const httpMocks = require("node-mocks-http");

const {
  insertProduct,
  getProductsByUser,
  removeProduct,
} = require("../../queries/wishlist");

const {
  getWishList,
  addToWishList,
  removeFromWishList,
} = require("../../controllers/wishlist");

const user_id = 1;
const variant_id = 1;
const wishlist_id = 1;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("getWishList", () => {
  it("should be a function", () => {
    expect(getWishList).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.user = { id: user_id };
    await getWishList(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("addToWishList", () => {
  it("should be a function", () => {
    expect(addToWishList).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.user = { id: user_id };
    await addToWishList(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("removeFromWishList", () => {
  it("should be a function", () => {
    expect(removeFromWishList).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.user = { id: user_id };
    await removeFromWishList(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("insertProduct", () => {
  it("should be a function", () => {
    expect(insertProduct).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    await insertProduct(user_id, variant_id);
    expect(res.statusCode).toBe(200);
  });
});

describe("getProductsByUser", () => {
  it("should be a function", () => {
    expect(getProductsByUser).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    await getProductsByUser(user_id);
    expect(res.statusCode).toBe(200);
  });
});

describe("removeProduct", () => {
  it("should be a function", () => {
    expect(removeProduct).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    await removeProduct(user_id, wishlist_id);
    expect(res.statusCode).toBe(200);
  });
});
