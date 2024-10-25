// Originally: https://github.com/suren-atoyan/react-pwa/blob/master/src/utils/sleep.ts
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export default sleep;