const { client } = require("./db")
const auth = require("../auth/migration")
const onboarding = require("../../module/binding/migration")

let migration = async () => {
  try {
    await client.connect();

    await auth.migration(client)
    await onboarding.migration(client)

    await client.end();
  } catch (err) {
    console.log(err.message);
    await client.end();
  }
}

migration()