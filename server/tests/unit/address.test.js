const router = require("../../routes/order/address");
const request = require("supertest");
const { faker } = require("@faker-js/faker");


const id;

describe("address form validation", () => {
  test("address form should return 400 for empty body", async () => {
    request(router).post("/").send({}).expect(400);
  });

  test("user Validation should return 400 for invalid email", async () => {
    request(router)
      .post("/")
      .send({
        name:  faker.name.findName(),
        email: "notanemail",
        phone: faker.phone.phoneNumber("991#######"),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        pin_code: faker.address.zipCode(),
        country: faker.address.countryCode(),
      })
      .expect(400);
  });
  test("address form should return 400 for invalid name", async () => {
    request(router)
      .post("/")
      .send({
        name: "",
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber("991#######"),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        pin_code: faker.address.zipCode(),
        country: faker.address.countryCode(),
      })
      .expect(400);
  });
  test("address form should return 400 for invalid phone", async () => {
    request(router)
      .post("/")
      .send({
        name:  faker.name.findName(),
        email: faker.internet.email(),
        phone: "",
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        pin_code: faker.address.zipCode(),
        country: faker.address.countryCode(),
      })
      .expect(400);
  });
  test("address form should return 400 for invalid street", async () => {
    request(router)
      .post("/")
      .send({
        name:  faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber("991#######"),
        street: "",
        city: faker.address.city(),
        state: faker.address.state(),
        pin_code: faker.address.zipCode(),
        country: faker.address.countryCode(),
      })
      .expect(400);
  });
  test("address form should return 400 for invalid city", async () => {
    request(router)
      .post("/")
      .send({
        name:  faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber("991#######"),
        street: faker.address.streetAddress(),
        city: "",
        state: faker.address.state(),
        pin_code: faker.address.zipCode(),
        country: faker.address.countryCode(),
      })
      .expect(400);
  });

  test("address form should return 400 for invalid pin_code", async () => {
    request(router)
      .post("/")
      .send({
        name:  faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber("991#######"),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        pin_code:"",
        country: faker.address.countryCode(),

      })
      .expect(400);
  });

  test("address form should return 400 for invalid state", async () => {
    request(router)
      .post("/")
      .send({
        name:  faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber("991#######"),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: "",
        pin_code: faker.address.zipCode(),
        country: faker.address.countryCode(),

      })
      .expect(400);
  });

  test("address form should return 400 for invalid country", async () => {
    request(router)
      .post("/")
      .send({
        name:  faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber("991#######"),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        pin_code: faker.address.zipCode(),
        country: "",
      })
      .expect(400);
  });

  test("delete address", async () => {
    request(router).delete("/:id/delete").query({ id: id }).expect(200);
  });
});
