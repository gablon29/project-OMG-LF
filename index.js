const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { middleware } = require("supertokens-node/framework/express");
const { errorHandler } = require("supertokens-node/framework/express");

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "<YOUR_CONNECTION_URL>",
    apiKey: "<YOUR_API_KEY>",
  },
  appInfo: {
    appName: "meetup-clone",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
// IMPORTANT: CORS should be before the below line.
app.use(middleware());
// Add this AFTER all your routes
app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
