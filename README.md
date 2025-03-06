# Strava_API_Tests_With_JEST
📌 Overview

This repository contains an automated test suite for **Strava APIs** using **Jest** and **Supertest**. The suite is designed to validate Strava API endpoints and **automatically handle OAuth 2.0 authentication.**

Strava APIs use OAuth 2.0 for authentication, where:
	•	The access **token expires every 6 hours** ⏳.
	•	A **refresh token** is required to get a new access token 🔄.
	•	This test suite automatically refreshes the access token whenever it expires, **ensuring seamless API testing**.
⸻
🔹 Features

✅ Automated API Testing with Jest & Supertest
✅ OAuth 2.0 Token Management (Auto-refresh when expired)
✅ Dynamic Environment Variable Handling
✅ CI Integrated to Github Actions
✅ Easy Configuration via .env file
⸻
**Steps to run the tests locally:**
1. Clone the repo.
2. Run 'npm install' command.
3. Add a .env file to the root directory, refer .env.example file for content to be added.
For Step 3, you may need to refer Strava API Documentation to get refresh token for the athlete, let me know if you need tokens for usage, else you can run the tests on the pipeline.
4. Run 'npm run test' command.
5. Once the tests completes, the reports are generated inside results/jest folder.
6. Open test-report.html file to view the report. (Copy path of the file and paste it on a browser's url bar)

**Running the tests through GitHub UI without cloning the repo:**
1. Navigate to 'Actions' tab of the repo in GitHub.
2. In the 'Actions' list on the left hand side, select 'Run Tests on pipeline'.
3. Click the 'Run workflow' button on the right hand side.
4. Select the branch, (main is default).
5. Click 'Run workflow' button on the dialog.

**Viewing the test reports for tests run on pipeline:**
1. In the same 'Actions' page of the repo in GitHub, click on the test run under the workflow runs list.
2. In the run's page, notice the 'Artifacts' section.
3. Click download button for 'jest-html-report', a zip file gets downloaded.
4. Unzip and open the folder and double click the 'test-report.html' file to view the report.


**🔑 OAuth 2.0 Token Refresh Handling**
Strava’s access tokens expire every 6 hours. This suite automatically **securely handles token refresh before running tests**, with **no manual intervention required** !
____

**📖 References**
	•	Strava API Docs: [https://developers.strava.com](https://developers.strava.com/)
	•	OAuth Authentication: [Strava OAuth 2.0](https://developers.strava.com/docs/authentication/#oauthoverview)
⸻

**🙌 Contributing:**
Want to contribute? Feel free to:
	•	Add new test cases
	•	Improve token handling
	•	Enhance CI/CD workflows
	•	Fix any issues (Submit a pull request!)
⸻

🚀 Happy Testing! 🏃‍♂️⚡

