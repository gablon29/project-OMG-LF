const express = require("express");
const cors = require("cors");
const app = express();
const uuid = require("uuid");
const PORT = 4000;
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { middleware } = require("supertokens-node/framework/express");
const { errorHandler } = require("supertokens-node/framework/express");

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI:
      "https://st-dev-cd72ff50-48aa-11ee-adbb-eb54f9de4d30.aws.supertokens.io",
    apiKey: "-zetjPmrSpPAhiFOLwOn7bpdax",
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

app.get("/events", (req, res) => {
  res.json({
    message: "Success!",
    events,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

function generateID() {
  return uuid.v4();
}

const events = [
  {
    id: generateID(),
    title: "Novu Community Call",
    slug: "novu-community-call",
    host: "Novu Development Team",
    category: "social-activities",
    start_time: "8:00pm",
    location: "Online (Discord Channel)",
    comments: [
      { user: "nevodavid", id: generateID(), comment: "Can't wait!😍" },
      { user: "emil_pearce", id: generateID(), comment: "Let's go!🚀" },
    ],
    attendees: [
      "nevodavid",
      "emil_pearce",
      "tomer_barnea",
      "unicodeveloper",
      "scopsy",
    ],
    description:
      "Dear attendee,\n We hope this message finds you well! We're excited to invite you to our upcoming Novu Community Call, where we will come together to share insights, updates, and engage in meaningful discussions. Your presence and contributions are highly valued as we continue to grow and strengthen our vibrant Novu community.",
  },
  {
    id: generateID(),
    title: "Novu Team Hangout",
    slug: "novu-team-hangout",
    host: "Novu Team",
    category: "social-activities",
    start_time: "12:30pm",
    location: "Online (Google Meet)",
    comments: [
      { user: "nevodavid", id: generateID(), comment: "Can't wait!😍" },
      { user: "emil_pearce", id: generateID(), comment: "Let's go!🚀" },
    ],
    attendees: ["nevodavid", "tomer_barnea", "unicodeveloper", "scopsy"],
    description:
      "Dear attendee,\n We hope this message finds you well! We're excited to invite you to our upcoming Novu Community Call, where we will come together to share insights, updates, and engage in meaningful discussions. Your presence and contributions are highly valued as we continue to grow and strengthen our vibrant Novu community.",
  },
];
