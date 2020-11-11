const fs = require("fs").promises;
const path = require("path");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

/**
 *
 * This will run lighthouse on the given URL once and log the scores
 *
 * @param {string} webpageUrl URL of the page on which you wish to run lighthouse
 */
async function test(webpageUrl) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(webpageUrl, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  await fs.writeFile(
    path.resolve(
      path.join(__dirname, "..", "reports", `${Date.now()}_lhreport.json`)
    ),
    reportHtml
  );

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log(
    "Performance score was",
    runnerResult.lhr.categories.performance.score * 100
  );

  await chrome.kill();
}

/**
 *
 * This will compute a median score based on running lighthouse multiple timess
 *
 * @param {string} webpageUrl URL of the page on which you wish to run lighthouse
 */
function test2(webpageUrl) {
  const spawnSync = require("child_process").spawnSync;
  const lighthouseCli = require.resolve("lighthouse/lighthouse-cli");
  const {
    computeMedianRun,
  } = require("lighthouse/lighthouse-core/lib/median-run.js");

  const results = [];
  for (let i = 0; i < 5; i++) {
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

try {
  test(
    "https://www.vikatan.com/amp/story/government-and-politics/international/mike-pompeo-press-meet-regarding-us-presidential-election"
  );
  // test2(
  //   "https://www.vikatan.com/amp/story/government-and-politics/international/mike-pompeo-press-meet-regarding-us-presidential-election"
  // );
} catch (e) {
  console.error(e);
}
