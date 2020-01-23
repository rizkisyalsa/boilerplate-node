const router = require("express").Router();
const Binding = require("./repository")

router.get('/', async (req, res) => {
  const { limit, page, search} = req.query;
  const data = await Binding.getData(parseInt(limit), parseInt(page), search);
  res.json(data)
})

module.exports = router;