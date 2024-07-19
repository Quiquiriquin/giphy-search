var express = require("express");
var router = express.Router();
const searchController = require("../controllers/search.controller");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/search", async (req, res) => {
  const { search } = req.body;
  await searchController.addHistory(search);
  res.status(201).send({
    message: "saved",
  });
});

router.get("/search", async (req, res) => {
  const data = await searchController.getHistory();
  console.log("ANS", data);
  res.status(200).send({
    data,
  });
});

module.exports = router;
