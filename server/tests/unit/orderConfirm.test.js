const { getOrderInfo, getOrderItems } = require("../../controllers/orders");
const httpMocks = require("node-mocks-http");
const user_id = 1;
const order_id = 1;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("getOrderInfo", () => {
  it("should be a function", () => {
    expect(getOrderInfo).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.params = { order_id: order_id };
    req.user = { id: user_id };
    await getOrderInfo(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("getOrderItems", () => {
  it("should be a function", () => {
    expect(getOrderItems).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.params = { order_id: order_id };
    req.user = { id: user_id };
    await getOrderItems(req, res);
    expect(res.statusCode).toBe(200);
  });
});
