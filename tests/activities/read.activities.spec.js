import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import "dotenv/config";

const BASE_URL = process.env.BASE_URL|| 'url not set';
const INVALID_TOKEN = "89f71c563770d111c5064c02a75eb88511112345";


describe("Read all activities of the athlete", () => {
  
  test("Success case - Verify the fields received", async () => {
    
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${process.env.ACTIVITY_READ_ACCESS_TOKEN}`)
    .query({ page: "2", per_page: "3" });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
  });

  test("Verify 401 when token is invalid", async () => {
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${INVALID_TOKEN}`);
    
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("Athlete");
    expect(response.body.errors[0].field).toBe("access_token");
    expect(response.body.errors[0].code).toBe("invalid");
  });

  test("Verify using valid token without necessary scope, try with read access(not read:activity access)'", async () => {
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${process.env.READ_ACCESS_TOKEN}`);
    
    expect(response.status).toBe(401);  //Ideally should be 403
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("AccessToken");
    expect(response.body.errors[0].field).toBe("activity:read_permission");
    expect(response.body.errors[0].code).toBe("missing");
  });

  test("Verify using valid token without necessary scope, try with write:activity access(not read:activity access)", async () => {
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${process.env.ACTIVITY_WRITE_ACCESS_TOKEN}`);
    
    expect(response.status).toBe(401);  //Ideally should be 403
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("AccessToken");
    expect(response.body.errors[0].field).toBe("activity:read_permission");
    expect(response.body.errors[0].code).toBe("missing");
  });
});

describe("Read activity of the athlete by activity id", () => {
  test("Success case - Verify the fields received", async () => {
    
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${process.env.ACTIVITY_READ_ACCESS_TOKEN}`)
    .query({ page: "2", per_page: "3" });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(3);
  });

  test("Verify 401 when token is invalid", async () => {
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${INVALID_TOKEN}`);
    
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("Athlete");
    expect(response.body.errors[0].field).toBe("access_token");
    expect(response.body.errors[0].code).toBe("invalid");
  });

  test("Verify using valid token without necessary scope, try with read access(not read:activity access)'", async () => {
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${process.env.READ_ACCESS_TOKEN}`);
    
    expect(response.status).toBe(401);  //Ideally should be 403
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("AccessToken");
    expect(response.body.errors[0].field).toBe("activity:read_permission");
    expect(response.body.errors[0].code).toBe("missing");
  });

  test("Verify using valid token without necessary scope, try with write:activity access(not read:activity access)", async () => {
    const response = await request(BASE_URL)
    .get("/athlete/activities")
    .set("Authorization", `Bearer ${process.env.ACTIVITY_WRITE_ACCESS_TOKEN}`);
    
    expect(response.status).toBe(401);  //Ideally should be 403
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("AccessToken");
    expect(response.body.errors[0].field).toBe("activity:read_permission");
    expect(response.body.errors[0].code).toBe("missing");
  });
});