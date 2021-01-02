const { runPagespeedInsights } = require("./pagespeed-insights");
const { writeReport } = require("../helpers/write-report");

async function pagespeedInsightsAvg(webpageUrl, n = 3) {
  // runs parallelly
  // const promises = new Array(n).fill(runPagespeedInsights(webpageUrl));
  // let cumulativeData = await Promise.all(promises);

  // runs serially
  let cumulativeData = [];
  for (let i = 0; i < n; i++) {
    const data = await runPagespeedInsights(webpageUrl);
    cumulativeData.push(data);
  }

  cumulativeData = cumulativeData
    .map((data) => data.lighthouseResult.audits.metrics.details.items[0])
    .map((item) => {
      const {
        firstContentfulPaint,
        firstMeaningfulPaint,
        largestContentfulPaint,
        interactive,
        speedIndex,
      } = item;
      return {
        firstContentfulPaint,
        firstMeaningfulPaint,
        largestContentfulPaint,
        interactive,
        speedIndex,
      };
    });
  // .reduce((acc, curr) => {});
  console.log(cumulativeData);
  // return writeReport(
  //   JSON.stringify(cumulativeData),
  //   "pagespeed-insights-5-runs_"
  // );
}

module.exports = { pagespeedInsightsAvg };
