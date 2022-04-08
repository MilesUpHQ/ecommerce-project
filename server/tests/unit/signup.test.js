const userList = require("../../routes/admin/users/userList");
const router = require("../../routes/userAuth/signup");
const request = require("supertest");

let user_id;
describe("signup route validations", () => {
  test("user Validation should return 400 for empty body", async () => {
    request(router).post("/").send({}).expect(400);
  });

  test("user Validation should return 400 for invalid email", async () => {
    request(router)
      .post("/")
      .send({
        email: "notanemail",
        password: "password",
        username: "username",
        first_name: "first",
        last_name: "last",
      })
      .expect(400);
  });
  test("user Validation should return 400 for invalid password", async () => {
    request(router)
      .post("/")
      .send({
        email: "manisai@gmail.com",
        password: "pas",
        username: "username",
        first_name: "first",
        last_name: "last",
      })
      .expect(400);
  });
  test("user Validation should return 400 for invalid username", async () => {
    request(router)
      .post("/")
      .send({
        email: "manisai@gmail.com",
        password: "password",
        username: "",
        first_name: "first",
        last_name: "last",
      })
      .expect(400);
  });
  test("user Validation should return 400 for invalid first name", async () => {
    request(router)
      .post("/")
      .send({
        email: "manisai@gmail.com",
        password: "password",
        username: "username",
        first_name: "",
        last_name: "last",
      })
      .expect(400);
  });
  test("user Validation should return 400 for invalid last name", async () => {
    request(router)
      .post("/")
      .send({
        email: "manisai@gmail.com",
        password: "password",
        username: "username",
        first_name: "first",
        last_name: "",
      })
      .expect(400);
  });

  test("user Validation should return 400 for duplicate email", async () => {
    request(router)
      .post("/")
      .send({
        email: "manisaiprasad@gmail.com",
        password: "password",
        username: "manisai",
        first_name: "first",
        last_name: "last",
      })
      .expect(400);
  });
  test("user Validation should return 400 for duplicate username", async () => {
    request(router)
      .post("/")
      .send({
        email: "manisai@gmail.com",
        password: "password",
        username: "manisai",
        first_name: "first",
        last_name: "last",
      })
      .expect(400);
  });

  test("delete user", async () => {
    request(userList).delete("/").query({ user_id: user_id }).expect(200);
  });
});
