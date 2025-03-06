import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import "dotenv/config";

const BASE_URL = process.env.BASE_URL|| 'url not set';
const INVALID_TOKEN = "89f71c563770d111c5064c02a75eb88511112345";


describe("Create activity for the athlete", () => {
  
  test("Success case - Verify fields received in response", async () => {
    const name = `name_${new Date().getTime()}`;
    const start_date_local = new Date().toISOString().split(".")[0] + "Z";
  
    const response = await request(BASE_URL)
    .post("/activities")
    .set("Authorization", `Bearer ${process.env.ACTIVITY_WRITE_ACCESS_TOKEN}`)
    .send({
      name: name,
      type: "Run",  // Run, Ride, Swim, etc.
      start_date_local: start_date_local,
      elapsed_time: 3601, // in seconds
      description: "Test Run Description",
      distance: 100, // in meters
      trainer: false,
      commute: false,
    });
    expect(response.status).toBe(201);
    expect(response.body.athlete).toHaveProperty("id");
    expect(response.body.name).toBe(name);
    expect(response.body.type).toBe("Run");
    expect(response.body.start_date_local).toBe(start_date_local);
    expect(response.body.elapsed_time).toBe(3601);
    expect(response.body.description).toBe("Test Run Description");
    expect(response.body.distance).toBe(100);
    expect(response.body.trainer).toBe(false);
    expect(response.body.commute).toBe(false);
  });

  test("Verify 401 when token is invalid", async () => {
    const response = await request(BASE_URL)
    .post("/activities")
    .set("Authorization", `Bearer ${INVALID_TOKEN}`)
    .send({
      name: "Test Run",
      type: "Run",  // Run, Ride, Swim, etc.
      start_date_local: "2025-03-06 01:19:00",
      elapsed_time: 360, // in seconds
      description: "Test Run Description",
      distance: 1000, // in meters
      trainer: false,
      commute: false,
    });
    
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("Athlete");
    expect(response.body.errors[0].field).toBe("access_token");
    expect(response.body.errors[0].code).toBe("invalid");
  });

  test("Verify using valid token without necessary scope(permission) 'write:activity'", async () => {
    const response = await request(BASE_URL)
    .post("/activities")
    .set("Authorization", `Bearer ${process.env.READ_ACCESS_TOKEN}`)
    .send({
      name: "Test Run",
      type: "Run",  // Run, Ride, Swim, etc.
      start_date_local: "2025-03-06 10:00:00",
      elapsed_time: 3601, // in seconds
      description: "Test Run Description",
      distance: 10000, // in meters
      trainer: false,
      commute: false,
    });
    
    expect(response.status).toBe(401);  //Ideally should be 403
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("AccessToken");
    expect(response.body.errors[0].field).toBe("activity:write_permission");
    expect(response.body.errors[0].code).toBe("missing");
  });
});