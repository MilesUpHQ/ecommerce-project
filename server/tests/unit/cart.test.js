const httpMocks = require("node-mocks-http");
const {
  insertOrderCart,
  getOrderCartBy,
  insertOrderItems,
  updateQuantity,
  getOrderItemsBy,
} = require("../../queries/order");

const {
  getCart,
  addToCart,
  updateCartQuantity,
  deleteCart,
} = require("../../controllers/cart");

const express = require("express");
const router = require("../../routes/cart");

const app = new express();
app.use("/", router);

const user_id = 1;
const status = "cart";
const quantity = 1;
const order_id = 1;
const variant_id = 1;
const prev_quantity = 1;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe("getCart", () => {
  it("should be a function", () => {
    expect(getCart).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.user = { id: user_id };
    await getCart(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("addToCart", () => {
  it("should be a function", () => {
    expect(addToCart).toBeInstanceOf(Function);
  });
});

describe("updateCartQuantity", () => {
  it("should be a function", () => {
    expect(updateCartQuantity).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.params = { id: order_id };
    req.body = { quantity: quantity };
    await updateCartQuantity(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("deleteCart", () => {
  it("should be a function", () => {
    expect(deleteCart).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.params = { id: order_id };
    await deleteCart(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("insertOrderCart", () => {
  it("should have a insertOrderCart function", () => {
    expect(insertOrderCart).toBeDefined();
  });

  it("should call insertOrderCart function", () => {
    insertOrderCart(user_id, status).then((row) => {
      expect(row).toBeDefined();
    });
  });

  it("should return 200 response", () => {
    insertOrderCart(user_id, status).then((row) => {
      expect(res.statusCode).toBe(200);
    });
  });

  it("should return an object", () => {
    insertOrderCart(user_id, status).then((row) => {
      expect(typeof row).toBe("object");
    });
  });
});

describe("getOrderCartBy", () => {
  it("should have a getOrderCartBy function", () => {
    expect(getOrderCartBy).toBeDefined();
  });

  it("should call getOrderCartBy function", () => {
    getOrderCartBy("user_id", user_id).then((row) => {
      expect(row).toBeDefined();
    });
  });

  it("should return 200 response", () => {
    getOrderCartBy("user_id", user_id).then((row) => {
      expect(res.statusCode).toBe(200);
    });
  });

  it("should return an array", () => {
    getOrderCartBy("user_id", user_id).then((row) => {
      expect(Array.isArray(row)).toBe(true);
    });
  });
});

describe("insertOrderItems", () => {
  it("should have a insertOrderItems function", () => {
    expect(insertOrderItems).toBeDefined();
  });

  it("should call insertOrderItems function", () => {
    insertOrderItems(order_id, variant_id, quantity).then((row) => {
      expect(row).toBeDefined();
    });
  });

  it("should return 200 response", () => {
    insertOrderItems(order_id, variant_id, quantity).then((row) => {
      expect(res.statusCode).toBe(200);
    });
  });
});

describe("updateQuantity", () => {
  it("should have a updateQuantity function", () => {
    expect(updateQuantity).toBeDefined();
  });

  it("should call updateQuantity function", () => {
    updateQuantity(order_id, variant_id, prev_quantity, quantity).then(
      (row) => {
        expect(row).toBeDefined();
      }
    );
  });

  it("should return 200 response", () => {
    updateQuantity(order_id, variant_id, prev_quantity, quantity).then(
      (row) => {
        expect(res.statusCode).toBe(200);
      }
    );
  });
});

describe("getOrderItemsBy", () => {
  it("should have a getOrderItemsBy function", () => {
    expect(getOrderItemsBy).toBeDefined();
  });

  it("should call getOrderItemsBy function", () => {
    getOrderItemsBy(order_id, variant_id).then((row) => {
      expect(row).toBeDefined();
    });
  });

  it("should return 200 response", () => {
    getOrderItemsBy(order_id, variant_id).then((row) => {
      expect(res.statusCode).toBe(200);
    });
  });

  it("should return an array", () => {
    getOrderItemsBy(order_id, variant_id).then((row) => {
      expect(Array.isArray(row)).toBe(true);
    });
  });
});
