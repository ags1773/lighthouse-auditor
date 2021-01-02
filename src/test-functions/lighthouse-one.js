const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const { writeReport } = require("../helpers/write-report");

/**
 *
 * This will run lighthouse on the given URL once and log the scores
 *
 * @param {string} webpageUrl URL of the page on which you wish to run lighthouse
 */
async function lighthouseOne(webpageUrl) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(webpageUrl, options);

  // `.report` is the HTML report as a string
  const report = runnerResult.report;
  await writeReport(report);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log(
    "Performance score was",
    runnerResult.lhr.categories.performance.score * 100
  );

  await chrome.kill();
}

module.exports = { lighthouseOne };
