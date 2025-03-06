import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import "dotenv/config";

const BASE_URL = process.env.BASE_URL|| 'url not set';
const INVALID_TOKEN = "89f71c563770d111c5064c02a75eb88511112345";


describe("Update athlete", () => {
    const weight = 59;
  test("Success case - verify fields received", async () => {
    const response = await request(BASE_URL)
      .put("/athlete")
      .set("Authorization", `Bearer ${process.env.PROFILE_READ_WRITE_ACCESS_TOKEN}`)
      .send({weight: weight});
    expect(response.status).toBe(200);
    expect(response.body.weight).toBe(weight);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("firstname");
    expect(response.body).toHaveProperty("lastname");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("state");
    expect(response.body).toHaveProperty("country");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("sex");
    
  });

  test("Verify 401 when token is invalid", async () => {
    const response = await request(BASE_URL)
      .put("/athlete")
      .set("Authorization", `Bearer ${INVALID_TOKEN}`)
      .send({weight: '51'});

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("Athlete");
    expect(response.body.errors[0].field).toBe("access_token");
    expect(response.body.errors[0].code).toBe("invalid");
  });
});

