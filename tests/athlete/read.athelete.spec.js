import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import "dotenv/config";

const BASE_URL = process.env.BASE_URL;
const INVALID_TOKEN = "89f71c563770d111c5064c02a75eb88511112345";


describe("Read athlete's profile details", () => {
  test("Success case - verify fields received", async () => {
    const response = await request(BASE_URL)
      .get("/athlete")
      .set("Authorization", `Bearer ${process.env.READ_ACCESS_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("firstname");
    expect(response.body).toHaveProperty("lastname");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("state");
    expect(response.body).toHaveProperty("country");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("weight");
  });

  test("Verify 401 when token is invalid", async () => {
    const response = await request(BASE_URL)
      .get("/athlete")
      .set("Authorization", `Bearer ${INVALID_TOKEN}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("Athlete");
    expect(response.body.errors[0].field).toBe("access_token");
    expect(response.body.errors[0].code).toBe("invalid");
  });
});

describe("Read athlete's stats", () => {
  test("Success case - verify fields received", async () => {
    const athleteId = process.env.ATHLETE_ID;
    const response = await request(BASE_URL)
      .get(`/athletes/${athleteId}/stats`)
      .set("Authorization", `Bearer ${process.env.READ_ACCESS_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('all_run_totals');
    expect(response.body).toHaveProperty('all_ride_totals');
    expect(response.body).toHaveProperty('all_swim_totals');
    expect(response.body).toHaveProperty('recent_run_totals');
    expect(response.body).toHaveProperty('recent_ride_totals');
    expect(response.body).toHaveProperty('recent_swim_totals');
    expect(response.body).toHaveProperty('ytd_run_totals');
    expect(response.body).toHaveProperty('ytd_ride_totals');
    expect(response.body).toHaveProperty('ytd_swim_totals');
  });

  test("Verify 401 when token is invalid", async () => {
    const response = await request(BASE_URL)
      .get("/athlete")
      .set("Authorization", `Bearer ${INVALID_TOKEN}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authorization Error");
    expect(response.body.errors[0].resource).toBe("Athlete");
    expect(response.body.errors[0].field).toBe("access_token");
    expect(response.body.errors[0].code).toBe("invalid");
  });
});