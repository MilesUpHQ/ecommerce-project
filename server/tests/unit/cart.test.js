const httpMocks = require("node-mocks-http");
const {
  insertOrderCart,
  getOrderCartBy,
  insertOrderItems,
  updateQuantity,
  getOrderItemsBy,
} = require("../../queries/order");

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
