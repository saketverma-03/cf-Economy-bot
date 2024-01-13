const env = {
  NODE_ENV: process.env.NODE_ENV || "",
  MONGO_URI: process.env.MONGO_URI || ""
};

/**
 * @description  Checks if all env's are defined i.e have some true value
 *  NOTE: will through error if boolean false is set to some env,
 * */
function handleEnvCheck() {
  for (const property in env) {
    if (!env[property]) {
      console.error(`${property}: ${object[property]}`);
      throw new Error(`in .env "${property}" is missing`)
    }
  }
  console.log("ENV Check Passed")
}

export const config = {
  env,
  healthCheck: handleEnvCheck
};
