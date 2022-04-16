import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  const token = await fetch("https://abakus.eu.auth0.com/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: `{"client_id":"${process.env.API_CLIENT_ID}","client_secret":"${process.env.API_CLIENT_SECRET}","audience":"unitedticketsystem","grant_type":"client_credentials"}`,
  }).then((res) => res.json());
  res.status(200).json(token);
});
