import express from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

const jwtCheck = jwt({
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

app.get("/authorized", jwtCheck, function (req, res) {
  res.send("Secured Resource");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
