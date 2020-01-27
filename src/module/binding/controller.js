const router = require("express").Router();
const {getBinding, addBinding, updateStatus, updateMultipleStatus} = require("./repository")
const auth = require("../../core/auth/auth");

router.get('/', auth, async (req, res) => {
  const { limit, page, search} = req.query;
  const result = await getBinding(parseInt(limit), parseInt(page), search);
  res.json(result)
})

router.post('/', auth, async (req, res) => {
  const result = await addBinding(req.body);
  res.json(result)
})

router.post('/ums', auth, async (req, res) => {
  const result = await updateMultipleStatus(req.body);
  res.json(result)
})

router.put('/:id', auth, async (req, res) => {
  const {id_obu, status} = req.body
  const result = await updateStatus(id_obu, status)
  res.json(result)
})

module.exports = router;