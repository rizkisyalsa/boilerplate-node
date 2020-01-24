const router = require("express").Router();
const {getBinding, addBinding} = require("./repository")

router.get('/', async (req, res) => {
  const { limit, page, search} = req.query;
  const result = await getBinding(parseInt(limit), parseInt(page), search);
  res.json(result)
})

router.post('/', async (req, res) => {
  const result = await addBinding(req.body);
  res.json(result)
})

module.exports = router;