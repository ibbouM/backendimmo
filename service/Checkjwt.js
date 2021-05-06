const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-n3pszk4b.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:8080/",
  issuer: "https://dev-n3pszk4b.eu.auth0.com/",
  algorithms: ["RS256"],
});

module.exports = jwtCheck;
