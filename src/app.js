const { runPagespeedInsights } = require("./test-functions/pagespeed-insights");
const {
  pagespeedInsightsAvg,
} = require("./test-functions/pagespeed-insights-average");
// const {
//   pagespeedInsightsAvg,
// } = require("./test-functions/pagespeed-insights-average");

try {
  // lighthouseMedian(
  //   "https://www.vikatan.com/amp/story/government-and-politics/international/mike-pompeo-press-meet-regarding-us-presidential-election"
  // );
  // lighthouseOne(
  //   "https://www.vikatan.com/amp/story/government-and-politics/international/mike-pompeo-press-meet-regarding-us-presidential-election"
  // );
  pagespeedInsightsAvg(
    "https://www.vikatan.com/amp/story/government-and-politics/international/mike-pompeo-press-meet-regarding-us-presidential-election"
  ).then(() => console.log("Done!"));
} catch (e) {
  console.error(e);
}
