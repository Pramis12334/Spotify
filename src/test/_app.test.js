const request = require("supertest");

const app = require('../app');

describe("POST /api/auth/register", () => {
    it("should return 201 CREATED", async () => {
        const res = await request(app).post("/api/auth/register");

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ message: "User registered successfully", user});
    })
})
