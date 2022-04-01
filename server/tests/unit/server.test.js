const httpMocks = require("node-mocks-http");
const app = require("../../server");

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("app server running", () => {
  test("should run", () => {
    expect(app).toBeDefined();
  });

  test("should return 200 for get request", async () => {
    req.method = "GET";
    req.url = "/";
    await app(req, res);
    expect(res.statusCode).toBe(200);
  });
});
