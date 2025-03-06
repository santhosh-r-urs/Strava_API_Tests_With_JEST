import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const getProfileReadWriteTokens = async () => {
  try {
    const response = await axios.post(process.env.BASE_URL_AUTH, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: process.env.PROFILE_READ_WRITE_REFRESH_TOKEN,
    });

    // Store the new token in process.env for test execution
    process.env.PROFILE_READ_WRITE_ACCESS_TOKEN = response.data.access_token;
    process.env.PROFILE_READ_WRITE_REFRESH_TOKEN = response.data.refresh_token; 

  } catch (error) {
    console.error("Failed to refresh Strava Token:", error.response?.data || error.message);
  }
};

const getReadTokens = async () => {
    try {
      const response = await axios.post(process.env.BASE_URL_AUTH, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: process.env.READ_REFRESH_TOKEN,
      });
  
      // Store the new token in process.env for test execution
      process.env.READ_ACCESS_TOKEN = response.data.access_token;
      process.env.READ_REFRESH_TOKEN = response.data.refresh_token; 
  
    } catch (error) {
      console.error("Failed to refresh Strava Token:", error.response?.data || error.message);
    }
  };

  const getActivityWriteTokens = async () => {
    try {
      const response = await axios.post(process.env.BASE_URL_AUTH, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: process.env.ACTIVITY_WRITE_REFRESH_TOKEN,
      });
  
      // Store the new token in process.env for test execution
      process.env.ACTIVITY_WRITE_ACCESS_TOKEN = response.data.access_token;
      process.env.ACTIVITY_WRITE_REFRESH_TOKEN = response.data.refresh_token; 
  
    } catch (error) {
      console.error("Failed to refresh Strava Token:", error.response?.data || error.message);
    }
  };

  const getActivityReadTokens = async () => {
    try {
      const response = await axios.post(process.env.BASE_URL_AUTH, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: process.env.ACTIVITY_READ_REFRESH_TOKEN,
      });
  
      // Store the new token in process.env for test execution
      process.env.ACTIVITY_READ_ACCESS_TOKEN = response.data.access_token;
      process.env.ACTIVITY_READ_REFRESH_TOKEN = response.data.refresh_token; 
  
    } catch (error) {
      console.error("Failed to refresh Strava Token:", error.response?.data || error.message);
    }
  };

// Run all token refreshes before tests start
await getProfileReadWriteTokens();
await getReadTokens();
await getActivityWriteTokens();
await getActivityReadTokens();


