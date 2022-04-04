const router = require("../../routes/userAuth/getToken");
const request = require("supertest");

describe("login route validations", () => {
  test("user Validation should return 400 for empty body", async () => {
    request(router).post("/").send({}).expect(400);
  });

  test("user Validation should return 400 for invalid email", async () => {
    request(router)
      .post("/")
      .send({
        email: "notanemail",
        password: "password",
      })
      .expect(400);
  });

  test("user Validation should return 400 for invalid password", async () => {
    request(router)
      .post("/")
      .send({
        email: "manisai@gmail.com",
        password: "pas",
      })
      .expect(400);
  });
});
