// In src/v1/routes/index.js
const Router = require("express");
const router = Router();

router.route("/").get((req, res) => {
  res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

module.exports = router;