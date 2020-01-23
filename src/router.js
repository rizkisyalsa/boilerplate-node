
const registerRoute = (app) => {
  app.use("/api/user", require("./core/auth/controller"));
  app.use("/api/binding", require("./module/binding/controller"));
}

module.exports = {
  registerRoute
}