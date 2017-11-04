const express = require("express");
const next = require("next");

const app = next({
  dev: process.env.NODE_ENV !== "production" ? true : false
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log(`>> Ready to dev on http://localhost:${3000}`);
  });
});
