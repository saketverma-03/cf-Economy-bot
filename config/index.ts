const env = {
  NODE_ENV: process.env.NODE_ENV || "",
};

/**
 * @description  Checks if all env's are defined i.e have some true value
 *  NOTE: will through error if boolean false is set to some env,
 * */
function handleEnvCheck() {
  const envArray = Object.values(env)
  for (let i = 0; i < envArray.length; i++) {
    if (!envArray[i])
      throw new Error(`missing env value at index ${i}`)
  }


  console.log("ENV Check Passed")
}
handleEnvCheck()
export const config = {
  env,
  healthCheck: handleEnvCheck
};
