const request = require("supertest");
const app = require("../app");

test("GET / should return backend message", async () => {
  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);
  expect(response.text).toBe("Hello from Express backend!");
});