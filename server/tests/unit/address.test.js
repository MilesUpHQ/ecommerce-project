const router = require("../../routes/order/address");
const request = require("supertest");

const id;

describe("address form validation", () => {
  test("address form should return 400 for empty body", async () => {
    request(router).post("/").send({}).expect(400);
  });

  test("user Validation should return 400 for invalid email", async () => {
    request(router)
      .post("/")
      .send({
        name: "gangotri",
        email: "notanemail",
        phone: 9845521479,
        street: "kote road",
        city: "Rattihalli",
        pin_code: 581116,
        state: "karnataka",
        country: "India",
      })
      .expect(400);
  });
  test("address form should return 400 for invalid name", async () => {
    request(router)
      .post("/")
      .send({
        name: "",
        email: "nadigergangotri@gmail.com",
        phone: 9845521479,
        street: "kote road",
        city: "Rattihalli",
        pin_code: 581116,
        state: "karnataka",
        country: "India",
      })
      .expect(400);
  });
  test("address form should return 400 for invalid phone", async () => {
    request(router)
      .post("/")
      .send({
        name: "gangotri",
        email: "nadigergangotri@gmail.com",
        phone: "",
        street: "kote road",
        city: "Rattihalli",
        pin_code: 581116,
        state: "karnataka",
        country: "India",
      })
      .expect(400);
  });
  test("address form should return 400 for invalid street", async () => {
    request(router)
      .post("/")
      .send({
        name: "gangotri",
        email: "nadigergangotri@gmail.com",
        phone: 9845521479,
        street: "kote road",
        city: "",
        pin_code: 581116,
        state: "karnataka",
        country: "India",
      })
      .expect(400);
  });
  test("address form should return 400 for invalid city", async () => {
    request(router)
      .post("/")
      .send({
        name: "gangotri",
        email: "nadigergangotri@gmail.com",
        phone: 9845521479,
        street: "",
        city: "Rattihalli",
        pin_code: 581116,
        state: "karnataka",
        country: "India",
      })
      .expect(400);
  });

  test("address form should return 400 for invalid pin_code", async () => {
    request(router)
      .post("/")
      .send({
        name: "gangotri",
        email: "nadigergangotri@gmail.com",
        phone: 9845521479,
        street: "kote road",
        city: "Rattihalli",
        pin_code: "",
        state: "karnataka",
        country: "India",
      })
      .expect(400);
  });

  test("address form should return 400 for invalid state", async () => {
    request(router)
      .post("/")
      .send({
        name: "gangotri",
        email: "nadigergangotri@gmail.com",
        phone: 9845521479,
        street: "kote road",
        city: "Rattihalli",
        pin_code: 581116,
        state: "",
        country: "India",
      })
      .expect(400);
  });

  test("address form should return 400 for invalid country", async () => {
    request(router)
      .post("/")
      .send({
        name: "gangotri",
        email: "nadigergangotri@gmail.com",
        phone: 9845521479,
        street: "kote road",
        city: "Rattihalli",
        pin_code: 581116,
        state: "karnataka",
        country: "",
      })
      .expect(400);
  });

  test("delete address", async () => {
    request(router).delete("/:id/delete").query({ id: id }).expect(200);
  });
});
