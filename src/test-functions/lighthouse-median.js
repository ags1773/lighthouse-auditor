/**
 *
 * This will compute a median score based on running lighthouse multiple timess
 *
 * @param {string} webpageUrl URL of the page on which you wish to run lighthouse
 */
function lighthouseMedian(webpageUrl, n = 5) {
  const spawnSync = require("child_process").spawnSync;
  const lighthouseCli = require.resolve("lighthouse/lighthouse-cli");
  const {
    computeMedianRun,
  } = require("lighthouse/lighthouse-core/lib/median-run.js");

  const results = [];
  for (let i = 0; i < n; i++) {
    console.log(`Running Lighthouse attempt #${i + 1}...`);
    const { status = -1, stdout } = spawnSync("node", [
      lighthouseCli,
      webpageUrl,
      "--output=json",
    ]);
    if (status !== 0) {
      console.log("Lighthouse failed, skipping run...");
      continue;
    }
    results.push(JSON.parse(stdout));
  }

  const median = computeMedianRun(results);
  console.log(
    "Median performance score was",
    median.categories.performance.score * 100
  );
}

module.exports = { lighthouseMedian };
