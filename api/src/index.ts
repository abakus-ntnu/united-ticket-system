import express from "express";
import bodyParser from "body-parser";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import admin from "./routes/admin";
import attendee from "./routes/attendee";

const withAuth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://abakus.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "unitedticketsystem",
  issuer: "https://abakus.eu.auth0.com/",
  algorithms: ["RS256"],
});

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", withAuth, admin);
app.use("/", attendee);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
