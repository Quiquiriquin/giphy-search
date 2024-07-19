var express = require("express");
const { addSearch } = require("../controllers/search");
var router = express.Router();
const searchController = require("../controllers/search");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/search", async (req, res) => {
  console.log("Guardar: ");
  const { search } = req.body;
  await searchController.addSearch(search);
  res.status(200).send({
    message: "ok",
  });
});

router.get("/search", async (req, res) => {
  console.log("Guardar: ");
  const { search } = req.body;
  await searchController.getSearch();
  res.status(200).send({
    message: "ok",
  });
});

module.exports = router;
