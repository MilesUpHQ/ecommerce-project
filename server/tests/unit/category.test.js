const httpMocks = require("node-mocks-http");
const { addCategory, updateCategory } = require("../../queries/category");
const {
  getCategories,
  editCategory,
  postCategory,
  delCategory,
} = require("../../controllers/category");

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
let id = 3;
let name = "Shirtsss";
let parent_id = 1;

describe("getCategories controller", () => {
  it("should be a function", () => {
    expect(getCategories).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    await getCategories(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("postCategory controller", () => {
  it("should be a function", () => {
    expect(postCategory).toBeInstanceOf(Function);
  });
});

describe("editCategory controller", () => {
  it("should be a function", () => {
    expect(editCategory).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.body = {
      categoryId: id,
      categoryName: "Edit Controller Category",
      searchItemId: null,
    };
    await editCategory(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("delCategory controller", () => {
  it("should be a function", () => {
    expect(delCategory).toBeInstanceOf(Function);
  });

  it("should return a 200 status code", async () => {
    req.query = { id: id };
    await delCategory(req, res);
    expect(res.statusCode).toBe(200);
  });
});

describe("addCategory", () => {
  it("should have a addCategory function", () => {
    expect(addCategory).toBeDefined();
  });

  it("should call addCategory function", () => {
    addCategory({ id, name, parent_id }).then((row) => {
      expect(row).toBeDefined();
    });
  });
});

describe("updateCategory", () => {
  it("should have a updateCategory function", () => {
    expect(updateCategory).toBeDefined();
  });

  it("should call updateCategory function and return response 200, object", () => {
    updateCategory({ id, name: "Shirts", parent_id }).then(
      (row) => {
        expect(row).toBeDefined();
        expect(res.statusCode).toBe(200);
        expect(typeof row).toBe("object");
      }
    );
  });
});
